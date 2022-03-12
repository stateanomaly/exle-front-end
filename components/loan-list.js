import Link from 'next/link'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { UsersIcon } from '@heroicons/react/outline'
import LoanCard from './loan-card'
import { nanoErgsToErgs } from '../helper/erg-converter'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LoanList({ title, loanData }) {
  const getFundingGoal = nanoErgs => {
    return 'Goal: ' + nanoErgsToErgs(nanoErgs) + ' Ergs'
  }

  const getTitle = title => {
    if (title == null) {
      return 'Most Recent Loans'
    }

    if (title.toLowerCase() == 'repayment') {
      return 'Most Recent Repayments'
    } else {
      return 'Most Recent Loans'
    }
  }

  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-green-500">
        {getTitle(title)}
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loanData &&
          loanData.loans.map(item => <LoanCard loan={item} key={item.id} />)}
      </dl>
    </div>
  )
}
