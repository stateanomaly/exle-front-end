import { useState, useContext } from 'react'
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import MiddleEllipsis from 'react-middle-ellipsis'
import {
  ButtonGroup,
  Button as MUIButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material'
import { getExplorerAddressUri } from '../helper/explorer-helper'
import { fundingTermsOfUse } from '../helper/terms-of-use'
import { nanoErgsToErgs, ergsToNanoErgs } from '../helper/erg-converter'
import axios from 'axios'
import {
  getFundLoanApi,
  getFundRepaymentApi,
  getFullyFundRepaymentApi
} from '../config/path'
import { WalletContext } from '../context/wallet'
import { Button, Popup } from './generic'

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' }
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getFundStatus = isFunded => {
  if (isFunded) {
    return (
      <div className="text-sm font-small text-green-500 flex truncate text-green-200">
        Funded
      </div>
    )
  } else {
    return (
      <div className="text-sm font-small text-green-500 flex truncate text-yellow-200">
        Funding in Process
      </div>
    )
  }
}

const getActivityFeed = () => {
  return (
    <div className="mt-6 flow-root">
      <ul role="list" className="-mb-8">
        {timeline.map((item, itemIdx) => (
          <li key={item.id}>
            <div className="relative pb-8">
              {itemIdx !== timeline.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      item.type.bgColorClass,
                      'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                    )}
                  >
                    <item.type.icon
                      className="w-5 h-5 text-white"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-500">{item.content} </p>
                    <div style={{ width: '140px' }}>
                      <MiddleEllipsis>
                        <span>{item.target}</span>
                      </MiddleEllipsis>
                    </div>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={item.datetime}>{item.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

const getLenderPk = lenderPk => {
  if (lenderPk) {
    return (
      <div>
        <dt className="text-sm font-medium text-green-500">Lender PK</dt>
        <dd className="mt-1 mb-2 text-sm text-green-700 hover:text-green-800">
          <a href={getExplorerAddressUri(lenderPk)}>{lenderPk}</a>
        </dd>
      </div>
    )
  }
}

const getDetails = loanData => {
  const { boxState } = loanData
  const isRepayment = boxState.toLowerCase() === 'repayment'
  return (
    <div className="border-t border-gray-200 py-5">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-sm font-medium text-green-500">Description</dt>
          <dd className="mt-1 mb-2 text-sm text-green-700">
            {loanData.description}
          </dd>
          <dt className="text-sm font-medium text-green-500">Funding Goal</dt>
          <dd className="mt-1 mb-2 text-sm text-green-700">
            {loanData.fundingGoalInErgs} Ergs
          </dd>
          <dt className="text-sm font-medium text-green-500">Interest Rate</dt>
          <dd className="mt-1 mb-2 text-sm text-green-700">
            {loanData.interestRate}%
          </dd>
          <dt className="text-sm font-medium text-green-500">Deadline</dt>
          <dd className="mt-1 mb-2 text-sm text-green-700">
            {loanData.deadline}
          </dd>
          <dt className="text-sm font-medium text-green-500">
            Is Loan Funded?
          </dt>
          <dd className="mt-1 mb-2 text-sm text-green-700">
            {getFundStatus(isRepayment || loanData.isFunded)}
          </dd>
          {getLenderPk(loanData.lenderPk)}
          {getRepaymentDetails(loanData)}
        </div>
      </dl>
    </div>
  )
}

const getRepaymentDetails = loanData => {
  const { boxState } = loanData
  if (boxState.toLowerCase() === 'repayment') {
    return (
      <div>
        <dt className="text-sm font-medium text-green-500">Funded Height</dt>
        <dd className="mt-1 mb-2 text-sm text-green-700">
          {loanData.fundedHeight} Ergs
        </dd>
        <dt className="text-sm font-medium text-green-500">Repayment Amount</dt>
        <dd className="mt-1 mb-2 text-sm text-green-700">
          {loanData.repaymentAmountInErgs} Ergs
        </dd>
        <dt className="text-sm font-medium text-green-500">
          Repayment Deadline
        </dt>
        <dd className="mt-1 mb-2 text-sm text-green-700">
          Block {loanData.repaymentHeightGoal}
        </dd>
        <dt className="text-sm font-medium text-green-500">
          Is Repayment Funded?
        </dt>
        <dd className="mt-1 mb-2 text-sm text-green-700">
          {getFundStatus(loanData.isFunded)}
        </dd>
      </div>
    )
  }
}

export default function Loan({ loanData }) {
  const [isTermsOfUseChecked, setIsTermsOfUseChecked] = useState(false)
  const [popup, setPopup] = useState({})
  const [feedback, setFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [fundingAmount, setFundingAmount] = useState()
  const { name, description, borrowerPk, boxState } = loanData
  const wallet = useContext(WalletContext)

  const fundLoan = async () => {
    var body = {}
    body.walletAddress = wallet
    body.boxId = loanData.id

    var apiUrl
    if (loanData.boxState.toLowerCase() === 'repayment') {
      if (fundingAmount === getFundingLeft()) {
        apiUrl = getFullyFundRepaymentApi()
      } else {
        apiUrl = getFundRepaymentApi()
        body.fundAmount = ergsToNanoErgs(fundingAmount)
      }
    } else {
      apiUrl = getFundLoanApi()
    }
    setIsLoading(true)

    await axios
      .post(apiUrl, body, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        const submitIsSuccessful = res.data.ok
        const response = res.data
        setIsLoading(false)
        setPopup(response)
        setFeedback(true)

        if (submitIsSuccessful) {
          Router.push('/')
        }
      })
      .catch(error => {
        setIsLoading(false)
      })
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setFeedback(false)
  }

  const getFundingLeft = () => {
    var totalValue =
      boxState.toLowerCase() === 'repayment'
        ? loanData.repaymentAmountInNanoErgs
        : loanData.fundingGoal

    var boxValue = loanData.value
    var defaultBoxValue = 1000000
    var valueLeft = totalValue - boxValue + defaultBoxValue

    return nanoErgsToErgs(valueLeft)
  }

  const getFundingLeftTitle = () => {
    if (boxState.toLowerCase() === 'repayment') {
      return 'Total Repayment Amount Left'
    } else {
      return 'Total Funding Amount'
    }
  }

  const repaySplitAmount = () => {
    if (boxState.toLowerCase() === 'repayment') {
      return (
        <div className="mt-2 flow-root">
          <h4 id="timeline-title" className="text-md font-medium text-gray-900">
            Repayment Calculator
          </h4>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Amount
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm"> Σ </span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                defaultValue={fundingAmount}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <label htmlFor="currency" className="sr-only">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                >
                  <option>ERG</option>
                </select>
              </div>
            </div>
          </div>
          <ButtonGroup
            variant="outlined"
            aria-label="outlined button group"
            fullWidth={true}
          >
            <MUIButton onClick={() => setFundingAmount(getFundingLeft() * 0.1)}>
              1/10
            </MUIButton>
            <MUIButton
              onClick={() => setFundingAmount(getFundingLeft() * 0.25)}
            >
              1/4
            </MUIButton>
            <MUIButton onClick={() => setFundingAmount(getFundingLeft() * 0.5)}>
              1/2
            </MUIButton>
            <MUIButton onClick={() => setFundingAmount(getFundingLeft())}>
              full
            </MUIButton>
          </ButtonGroup>
        </div>
      )
    }
  }

  const getFundingDetails = (isTermsOfUseChecked, setIsTermsOfUseChecked) => {
    return (
      <section
        aria-labelledby="timeline-title"
        className="lg:col-start-3 lg:col-span-1"
      >
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
            Funding Details
          </h2>

          <div className="mt-6 flow-root">
            <h4
              id="timeline-title"
              className="text-md font-medium text-gray-900"
            >
              {getFundingLeftTitle()}
            </h4>
            <p className="text-s text-gray-500">{getFundingLeft()} Ergs</p>
          </div>
          {repaySplitAmount()}
          {/* Activity Feed */}
          <div className="mt-3 flow-root">
            <h3
              id="timeline-title"
              className="text-md font-medium text-gray-900"
            >
              Terms of Use
            </h3>
            <ul role="list">
              {fundingTermsOfUse.map(item => (
                <li key={item.id} className="mt-1">
                  <p className="text-xs text-gray-500">- {item.content} </p>
                </li>
              ))}
            </ul>
            <div className="relative flex items-start mt-3 align-middle">
              <div className="flex items-center h-5">
                <input
                  id="offers"
                  aria-describedby="offers-description"
                  name="offers"
                  type="checkbox"
                  className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                  checked={isTermsOfUseChecked}
                  onChange={e => {
                    setIsTermsOfUseChecked(e.target.checked)
                  }}
                />
              </div>
              <div className="ml-3 text-xs font-bold flex align-middle">
                <span id="offers-description" className="text-gray-500">
                  I agree to the terms of use
                </span>
              </div>
            </div>
            <Button
              type="button"
              className="mt-6 flex w-full justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-900 disabled:text-gray-300 uppercase"
              disabled={!isTermsOfUseChecked}
              onClick={fundLoan}
              loading={isLoading}
            >
              Fund this loan
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="relative bg-gray-900 sm:rounded-lg my-4">
      <main className="py-6">
        {/* Page header */}
        <div className="mt-2 max-w-3xl mx-auto grid grid-cols-1 gap-6 xs:px-8 sm:px-8 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="lg:col-start-1 lg:col-span-2">
            <div className="max-w-3xl mx-auto md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl">
              <div className="flex items-center space-x-5">
                <div>
                  <h1 className="text-2xl font-bold text-yellow-300">{name}</h1>
                  <p className="text-md font-sm text-gray-300">{boxState}</p>
                </div>
              </div>
            </div>

            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div>
                <div className="py-5">
                  <a
                    id="applicant-information-title"
                    className="text-lg font-medium text-green-700 hover:text-green-800"
                    href={getExplorerAddressUri(borrowerPk)}
                    style={{
                      overflowWrap: 'break-word',
                      whiteSpace: 'pre-wrap'
                    }}
                  >
                    {borrowerPk}
                  </a>
                  <p className="mt-1 max-w-2xl text-sm text-green-500">
                    Borrower PK
                  </p>
                </div>
                {getDetails(loanData)}
              </div>
            </section>
          </div>
          {getFundingDetails(isTermsOfUseChecked, setIsTermsOfUseChecked)}
          <Popup
            deadline={popup.deadline}
            erg={popup.fee}
            address={popup.address || ''}
            open={feedback}
            onClose={handleClose}
          />
        </div>
      </main>
    </div>
  )
}
