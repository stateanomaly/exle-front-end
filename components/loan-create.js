import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import TextError from 'components/text-error'
import axios from 'axios'
import { createLoanTermsOfUse } from '../helper/terms-of-use'
import { currentHeight } from '../helper/explorer'
import { WalletContext } from '../context/wallet'
import { getCreateLoanApi } from '../config/path'
import { Popup, Button } from './generic'
import { ergsToNanoErgs } from '../helper/erg-converter'

export default function LoanCreateForm() {
  const [isTermsOfUseChecked, setIsTermsOfUseChecked] = useState(false)
  const [popup, setPopup] = useState({})
  const [feedback, setFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const wallet = useContext(WalletContext)

  const onSubmit = async (data) => {
    setIsLoading(true)

    var createLoanApi = getCreateLoanApi()
    data.goal = ergsToNanoErgs(data.goal)
    console.log(data)

    await axios
      .post(createLoanApi, data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        const submitIsSuccessful = res.data.ok
        const response = res.data
        setPopup(response)
        setFeedback(true)
        setIsLoading(false)

        // if (submitIsSuccessful) {
        //   Router.push('/')
        // }
      })
      .catch((error) => {
        const response = error.response
        setIsLoading(false)
        throw error
      })
    setIsLoading(false)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setFeedback(false)
  }

  const getFundingDetails = (isTermsOfUseChecked, setIsTermsOfUseChecked) => {
    return (
      <section
        aria-labelledby="timeline-title"
        className="lg:col-start-3 lg:col-span-1"
      >
        <div className="bg-gray-200 px-4 py-5 sm:rounded-lg sm:px-6">
          {/* Activity Feed */}
          <div className="flow-root">
            <h3
              id="timeline-title"
              className="text-md font-medium text-gray-900"
            >
              Terms of Use
            </h3>
            <ul role="list">
              {createLoanTermsOfUse.map((item) => (
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
                  className="focus:ring-blue-500 h-4 w-4 text-white-600 border-gray-300 rounded"
                  checked={isTermsOfUseChecked}
                  onChange={(e) => {
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
            <input
              type="submit"
              value="Create Loan"
              className="mt-6 flex w-full justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-900 disabled:text-gray-300"
              disabled={!isTermsOfUseChecked}
            />
         
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 pt-20 text-white">
      <div className="py-5">
        <h3 className="text-xl leading-6 font-medium text-primary">
          Create a Loan
        </h3>
        <p className="mt-1 text-sm text-body-color-2 dark:text-body-color">
          Let&apos;s start from the basics
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sm:col-span-4 mb-4">
          <label
            htmlFor="name"
            className="block text-md font-medium text-primary"
          >
            Name
            <p className="text-sm text-body-color-2 dark:text-body-color">
              What is the name of the project that the loan is for?
            </p>
          </label>
          <div className="mt-1">
            <input
              {...register('name', { required: true, maxLength: 80 })}
              type="text"
              autoComplete="Name of Loan"
              className="block text-input-color w-full border-0 border-b border-transparent bg-opacity-5 bg-blue-200 focus:border-blue-400 focus:ring-0 sm:text-sm"
              
            />
            {errors.name?.type === 'required' && (
              <TextError>A Name is required</TextError>
            )}
          </div>
        </div>

        <div className="sm:col-span-6 mb-4">
          <label
            htmlFor="description"
            className="block text-md font-medium text-primary"
          >
            Description
            <p className="text-sm text-body-color-2 dark:text-body-color">
              What are the details of the project that this loan will be
              supporting? Write a detailed description to keep loaner
              well-informed.
            </p>
          </label>
          <div className="mt-1">
            <textarea
              {...register('description', { required: true })}
              rows={3}
              className="block w-full border-0 border-b border-transparent text-input-color bg-opacity-5 bg-blue-200 focus:border-blue-400 focus:ring-0 sm:text-sm"
              defaultValue={''}
            />
            {errors.description?.type === 'required' && (
              <TextError>A description is required</TextError>
            )}
          </div>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor="walletAddress"
            className="block text-md font-medium text-primary"
          >
            Wallet Address
          </label>
          <p className="text-sm text-body-color-2 dark:text-body-color">
            Wallet address of the borrower. This is where the loaned funds will
            be sent to.
          </p>
          <div className="mt-1">
            <input
              {...register('walletAddress', { required: true })}
              defaultValue={wallet}
              type="text"
              autoComplete="Wallet Address"
              className="block w-full border-0 border-b border-transparent text-input-color bg-opacity-5 bg-blue-200 focus:border-blue-400 focus:ring-0 sm:text-sm"
            />
            {errors.walletAddress?.type === 'required' && (
              <TextError>A wallet address is required</TextError>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="goal"
              className="block text-md font-medium text-primary"
            >
              Goal
              <p className="text-xs text-body-color-2 dark:text-body-color">
                What is the goal amount for the loan in USD? 
              </p>
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-white-500 sm:text-sm"> $ </span>
              </div>
              <input
                {...register('goal', { required: true, pattern: /0\.00/i })}
                type="number"
                autoComplete="goal"
                className="appearance-none pl-7 block text-input-color w-full border-0 border-b border-transparent bg-opacity-5 bg-blue-200 focus:border-blue-400 focus:ring-0 sm:text-sm"
                min="0"
                placeholder="0.00"
                step="0.01"
                defaultValue={0.00}
              />
              {errors.goal?.type === 'required' && (
                <TextError>A funding goal is required</TextError>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="deadlineHeight"
              className="block text-md font-medium text-primary"
            >
              Funding Deadline
              <p className="text-xs text-body-color-2 dark:text-body-color">
                When do you expect the goal to be funded by?
              </p>
            </label>
            <div className="mt-1">
              <input
                type="number"
                {...register('deadlineHeight', { required: true })}
                autoComplete="Deadline"
                className="block text-input-color w-full border-0 border-b border-transparent bg-opacity-5 bg-blue-200 focus:border-blue-400 focus:ring-0 sm:text-sm"
                min="1"
                step="1"
                defaultValue={1}
              />
              {errors.deadlineHeight?.type === 'required' && (
                <TextError>A funding deadline is required</TextError>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="interestRate"
              className="block text-md font-medium text-primary"
            >
              Interest Rate
              <p className="text-xs text-body-color-2 dark:text-body-color">
                What is the interest rate for this loan?
              </p>
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-white-500 sm:text-sm"> % </span>
              </div>
              <input
                {...register('interestRate', { required: true, pattern: /0\.00/i })}
                type="number"
                autoComplete="interestRate"
                className="pl-7 block text-input-color w-full border-0 border-b border-transparent bg-opacity-5 bg-blue-200 focus:border-blue-400 focus:ring-0 sm:text-sm"
                placeholder="0.00"
                min="0"
                step="1"
                defaultValue={0}
              />
              {errors.interestRate?.type === 'required' && (
                <TextError>An interest rate is required</TextError>
              )}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="repaymentHeightLength"
              className="block text-md font-medium text-primary"
            >
              Repayment Length
              <p className="text-xs text-body-color-2 dark:text-body-color">
                How long do you expect to repay this amount?
              </p>
            </label>
            <div className="mt-1">
              <input
                type="number"
                {...register('repaymentHeight', { required: true })}
                autoComplete="Repayment Length"
                className="block text-body-color w-full border-0 border-b border-transparent bg-opacity-5 bg-blue-200 focus:border-blue-400 focus:ring-0 sm:text-sm"
                min="1"
                step="1"
              />
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.repaymentHeight?.type === 'required'
                  ? 'A repayment length is required'
                  : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="">
            {getFundingDetails(isTermsOfUseChecked, setIsTermsOfUseChecked)}
            <Popup
              deadline={popup.deadline}
              erg={popup.fee}
              address={popup.address || ''}
              open={feedback}
              onClose={handleClose}
            />
          </div>
        </div>
      </form>
    </div>
  )
}
