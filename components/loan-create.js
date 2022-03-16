import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import TextError from 'components/text-error'
import axios from 'axios'
import Checkbox from './check-box'
import { createLoanTermsOfUse } from '../helper/terms-of-use'
import { currentHeight } from '../helper/explorer'
import { WalletContext } from '../context/wallet'
import { createLoanApi, mockCreateLoanApi } from '../config/path'

export default function LoanCreateForm() {
  const [isTermsOfUseChecked, setIsTermsOfUseChecked] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const wallet = useContext(WalletContext)

  const onSubmit = async data => {
    console.log(data)
    console.log(mockCreateLoanApi)
    await axios
      .post(mockCreateLoanApi, data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        console.log(res)
        const submitIsSuccessful = res.data.ok

        if (submitIsSuccessful) {
          Router.push('/')
        }
      })
  }

  const getFundingDetails = (isTermsOfUseChecked, setIsTermsOfUseChecked) => {
    return (
      <section
        aria-labelledby="timeline-title"
        className="lg:col-start-3 lg:col-span-1"
      >
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          {/* Activity Feed */}
          <div className="flow-root">
            <h3
              id="timeline-title"
              className="text-md font-medium text-gray-900"
            >
              Terms of Use
            </h3>
            <ul role="list">
              {createLoanTermsOfUse.map(item => (
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
            <button
              type="submit"
              className="mt-6 flex w-full justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-white bg-green-500 hover:bg-green-600 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-900 disabled:text-gray-300 uppercase"
              disabled={!isTermsOfUseChecked}
            >
              Create Loan
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:col-span-4 mb-4">
        <label
          htmlFor="name"
          className="block text-md font-medium text-green-500"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            {...register('name', { required: true })}
            type="text"
            autoComplete="Name of Loan"
            className="block text-yellow-200 w-full border-0 border-b border-transparent bg-opacity-5 bg-green-200 focus:border-green-400 focus:ring-0 sm:text-sm"
          />
          {errors.name?.type === 'required' && (
            <TextError>A Name is required</TextError>
          )}
        </div>
      </div>

      <div className="sm:col-span-6 mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-green-500"
        >
          Description
        </label>
        <div className="mt-1">
          <textarea
            {...register('description', { required: true })}
            rows={3}
            className="block text-yellow-200 w-full border-0 border-b border-transparent bg-opacity-5 bg-green-200 focus:border-green-400 focus:ring-0 sm:text-sm"
            defaultValue={''}
          />
          {errors.description?.type === 'required' && (
            <TextError>A Description is required</TextError>
          )}
        </div>
        <p className="mt-2 text-sm text-green-700">
          Write a few sentences about what you intend to do with the loan.
        </p>
      </div>

      <div className="sm:col-span-4">
        <label
          htmlFor="walletAddress"
          className="block text-sm font-medium text-green-500"
        >
          Wallet Address
        </label>
        <div className="mt-1">
          <input
            {...register('walletAddress', { required: true })}
            defaultValue={wallet}
            type="text"
            autoComplete="Wallet Address"
            className="block text-yellow-200 w-full border-0 border-b border-transparent bg-opacity-5 bg-green-200 focus:border-green-400 focus:ring-0 sm:text-sm"
          />
          {errors.walletAddress?.type === 'required' && (
            <TextError>A Wallet Address is required</TextError>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="goal"
            className="block text-sm font-medium text-green-500"
          >
            Goal
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('goal', { required: true })}
              autoComplete="goal"
              className="block text-yellow-200 w-full border-0 border-b border-transparent bg-opacity-5 bg-green-200 focus:border-green-400 focus:ring-0 sm:text-sm"
            />
            {errors.goal?.type === 'required' && (
              <TextError>A Goal is required</TextError>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="deadlineHeight"
            className="block text-sm font-medium text-green-500"
          >
            Deadline
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('deadline', { required: true })}
              autoComplete="Deadline"
              className="block text-yellow-200 w-full border-0 border-b border-transparent bg-opacity-5 bg-green-200 focus:border-green-400 focus:ring-0 sm:text-sm"
            />
            {errors.deadline?.type === 'required' && (
              <TextError>A Deadline is required</TextError>
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-green-500"
          >
            Interest Rate
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('interestRate', { required: true })}
              autoComplete="interestRate"
              className="block text-yellow-200 w-full border-0 border-b border-transparent bg-opacity-5 bg-green-200 focus:border-green-400 focus:ring-0 sm:text-sm"
            />
            {errors.interestRate?.type === 'required' && (
              <TextError>A Interest Rate is required</TextError>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="repaymentHeightLength"
            className="block text-sm font-medium text-green-500"
          >
            Repayment Length
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('repaymentHeightLength', { required: true })}
              autoComplete="Repayment Length"
              className="block text-yellow-200 w-full border-0 border-b border-transparent bg-opacity-5 bg-green-200 focus:border-green-400 focus:ring-0 sm:text-sm"
            />
            {errors.repaymentHeightLength?.type === 'required' && (
              <TextError>A Repayment Length is required</TextError>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex flex-row">
          {getFundingDetails(isTermsOfUseChecked, setIsTermsOfUseChecked)}
        </div>
      </div>
    </form>
  )
}
