import {
  CheckIcon,
  ThumbUpIcon,
  UserIcon,
} from '@heroicons/react/solid'
import MiddleEllipsis from "react-middle-ellipsis";
import MainLayout from 'components/main-layout'

const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'created loan address',
    target: '9gb3mPXuUbhVJrzvzR79d8hK5JTEWPduFfab4CkCFpr98dzQceG',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Add funds of 3 Erg by',
    target: '9ggCQdpJPSV9yekY8Mt8T1F2NmzEheY5egMZ7Z3ZXfUyziQe8Ey',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.advanced,
    content: 'Add funds of 3 Erg by',
    target: '9ggCQdpJPSV9yekY8Mt8T1F2NmzEheY5egMZ7Z3ZXfUyziQe8Ey',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Add funds of 3 Erg by',
    target: '9ggCQdpJPSV9yekY8Mt8T1F2NmzEheY5egMZ7Z3ZXfUyziQe8Ey',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Loan Funded! Paid to',
    target: '9hyTTDyCKBNKX2ZvFnuUkYmuEsMJYz3gQEyfAjSfsLRS2Yoiwbv',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <MainLayout>
    <div className="relative min-h-screen bg-gray-100">
      <main className="py-10">
        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
          <div className="flex items-center space-x-5">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Loan 1</h1>
              <p className="text-sm font-medium text-gray-500">
                Created on <time dateTime="2020-08-25">October 8, 2021</time>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            {/* Description list*/}
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 id="applicant-information-title" className="text-lg leading-6 font-medium text-gray-900">
                    Applicant Information
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">About</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat.
                        Excepteur qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                        proident. Irure nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                Timeline
              </h2>

              {/* Activity Feed */}
              <div className="mt-6 flow-root">
                <ul role="list" className="-mb-8">
                  {timeline.map((item, itemIdx) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== timeline.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                item.type.bgColorClass,
                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                              )}
                            >
                              <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {item.content}{' '}
                              </p>
                              <div style={{width:"140px"}}><MiddleEllipsis><span>{item.target}</span></MiddleEllipsis></div>
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
    </MainLayout>
  )
}