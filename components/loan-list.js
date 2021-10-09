import Link from 'next/link'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon
} from '@heroicons/react/outline'

const stats = [
  {
    id: 1,
    name: 'Loan 1',
    stat: '21 Erg',
    icon: UsersIcon,
    change: '122',
    changeType: 'increase'
  },
  {
    id: 2,
    name: 'Loan 2',
    stat: '48 Erg',
    icon: UsersIcon,
    change: '5.4%',
    changeType: 'increase'
  },
  {
    id: 3,
    name: 'Loan 3',
    stat: '56 Erg',
    icon: UsersIcon,
    change: '3.2%',
    changeType: 'decrease'
  },
  {
    id: 4,
    name: 'Loan 4',
    stat: '64 Erg',
    icon: UsersIcon,
    change: '5.4%',
    changeType: 'increase'
  },
  {
    id: 5,
    name: 'Loan 5',
    stat: '34 Erg',
    icon: UsersIcon,
    change: '5.4%',
    changeType: 'increase'
  },
  {
    id: 6,
    name: 'Loan 6',
    stat: '72 Erg',
    icon: UsersIcon,
    change: '5.4%',
    changeType: 'increase'
  },
  {
    id: 7,
    name: 'Loan 7',
    stat: '1465 Erg',
    icon: UsersIcon,
    change: '5.4%',
    changeType: 'increase'
  },
  {
    id: 8,
    name: 'Loan 8',
    stat: '44 Erg',
    icon: UsersIcon,
    change: '5.4%',
    changeType: 'increase'
  },
  {
    id: 9,
    name: 'Loan 9',
    stat: '974564 Erg',
    icon: UsersIcon,
    change: '5.4%',
    changeType: 'increase'
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LoanList() {
  return (
    <div>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Most Recent Loans
      </h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600',
                  'ml-2 flex items-baseline text-sm font-semibold'
                )}
              >
                {item.changeType === 'increase' ? (
                  <ArrowSmUpIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === 'increase' ? 'Increased' : 'Decreased'}{' '}
                  by
                </span>
                {item.change}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link
                    href={{
                      pathname: '/loan/[loan]',
                      query: { loan: item.id }
                    }}
                  >
                    <a className="font-medium text-indigo-600 hover:text-indigo-500">
                      {' '}
                      View loan
                      <span className="sr-only"> {item.name} stats</span>
                    </a>
                  </Link>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
