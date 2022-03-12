import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import MiddleEllipsis from 'react-middle-ellipsis'

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' }
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'created loan address',
    target: '9gb3mPXuUbhVJrzvzR79d8hK5JTEWPduFfab4CkCFpr98dzQceG',
    date: 'Sep 20',
    datetime: '2020-09-20'
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Add funds of 3 Erg by',
    target: '9ggCQdpJPSV9yekY8Mt8T1F2NmzEheY5egMZ7Z3ZXfUyziQe8Ey',
    date: 'Sep 22',
    datetime: '2020-09-22'
  },
  {
    id: 3,
    type: eventTypes.advanced,
    content: 'Add funds of 3 Erg by',
    target: '9ggCQdpJPSV9yekY8Mt8T1F2NmzEheY5egMZ7Z3ZXfUyziQe8Ey',
    date: 'Sep 28',
    datetime: '2020-09-28'
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Add funds of 3 Erg by',
    target: '9ggCQdpJPSV9yekY8Mt8T1F2NmzEheY5egMZ7Z3ZXfUyziQe8Ey',
    date: 'Sep 30',
    datetime: '2020-09-30'
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Loan Funded! Paid to',
    target: '9hyTTDyCKBNKX2ZvFnuUkYmuEsMJYz3gQEyfAjSfsLRS2Yoiwbv',
    date: 'Oct 4',
    datetime: '2020-10-04'
  }
]

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

const getDetails = loanData => {
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
          <dt className="text-sm font-medium text-green-500">Is Funded?</dt>
          <dd className="mt-1 mb-2 text-sm text-green-700">
            {getFundStatus(loanData.isFunded)}
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default function Loan({ loanData }) {
  const { name, description, borrowerPk } = loanData
  return (
    <div className="relative bg-gray-900 sm:rounded-lg my-4">
      <main className="py-6">
        {/* Page header */}
        <div className="mt-2 max-w-3xl mx-auto grid grid-cols-1 gap-6 xs:px-8 sm:px-8 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <div className="max-w-3xl mx-auto md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl">
              <div className="flex items-center space-x-5">
                <div>
                  <h1 className="text-2xl font-bold text-yellow-300">{name}</h1>
                </div>
              </div>
            </div>

            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div>
                <div className="py-5">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-green-700"
                    style={{ overflowWrap: 'anywhere' }}
                  >
                    {borrowerPk}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-green-500">
                    Borrower PK
                  </p>
                </div>
                {getDetails(loanData)}
              </div>
            </section>
          </div>

          <section
            aria-labelledby="timeline-title"
            className="lg:col-start-3 lg:col-span-1"
          >
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2
                id="timeline-title"
                className="text-lg font-medium text-gray-900"
              >
                Timeline
              </h2>

              {/* Activity Feed */}
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
                              <p className="text-sm text-gray-500">
                                {item.content}{' '}
                              </p>
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
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
