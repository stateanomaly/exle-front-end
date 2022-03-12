import { useForm } from 'react-hook-form'
import TextError from 'components/text-error'
import axios from 'axios'

export default function LoanCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const onSubmit = data => {
    axios
      .post('/api/create', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        const submitIsSuccessful = res.data.ok

        if (submitIsSuccessful) {
          Router.push('/')
        }
      })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="sm:col-span-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-green-700"
        >
          Name
        </label>
        <div className="mt-1">
          <input
            {...register('name', { required: true })}
            type="text"
            autoComplete="Name of Loan"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
          {errors.name?.type === 'required' && (
            <TextError>A Name is required</TextError>
          )}
        </div>
      </div>

      <div className="sm:col-span-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-green-700"
        >
          Description
        </label>
        <div className="mt-1">
          <textarea
            {...register('description', { required: true })}
            rows={3}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
            defaultValue={''}
          />
          {errors.description?.type === 'required' && (
            <TextError>A Description is required</TextError>
          )}
        </div>
        <p className="mt-2 text-sm text-green-500">
          Write a few sentences about what you intend to do with the loan.
        </p>
      </div>

      <div className="sm:col-span-4">
        <label
          htmlFor="walletAddress"
          className="block text-sm font-medium text-green-700"
        >
          Wallet Address
        </label>
        <div className="mt-1">
          <input
            {...register('walletAddress', { required: true })}
            type="text"
            autoComplete="Wallet Address"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
            className="block text-sm font-medium text-green-700"
          >
            Goal
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('goal', { required: true })}
              autoComplete="goal"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            {errors.goal?.type === 'required' && (
              <TextError>A Goal is required</TextError>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="deadlineHeight"
            className="block text-sm font-medium text-green-700"
          >
            Deadline
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('deadline', { required: true })}
              autoComplete="Deadline"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            {errors.deadline?.type === 'required' && (
              <TextError>A Deadline is required</TextError>
            )}
          </div>
        </div>
        <div className="sm:col-span-3">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-green-700"
          >
            Interest Rate
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('interestRate', { required: true })}
              autoComplete="interestRate"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            {errors.interestRate?.type === 'required' && (
              <TextError>A Interest Rate is required</TextError>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="repaymentHeightLength"
            className="block text-sm font-medium text-green-700"
          >
            Repayment Length
          </label>
          <div className="mt-1">
            <input
              type="number"
              {...register('repaymentHeightLength', { required: true })}
              autoComplete="Repayment Length"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
            {errors.repaymentHeightLength?.type === 'required' && (
              <TextError>A Repayment Length is required</TextError>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Loan
        </button>
      </div>
    </form>
  )
}
