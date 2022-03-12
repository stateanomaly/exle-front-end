import Link from 'next/link'
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'
import { UsersIcon } from '@heroicons/react/outline'
import { nanoErgsToErgs } from '../helper/erg-converter'
import styles from './Text.module.css'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LoanCard({ loan }) {
  const getFundingGoal = nanoErgs => {
    return 'Goal: ' + nanoErgsToErgs(nanoErgs) + ' Ergs'
  }

  const processDescription = description => {
    const charLimit = 100
    if (description.length > charLimit) {
      var result = description.slice(0, charLimit - 3) + '...'
      return result
    } else {
      return description + new Array(charLimit - description.length).join(' ')
    }
  }

  const getFundStatus = isFunded => {
    if (isFunded) {
      return (
        <div className="text-sm font-small text-green-500 flex truncate">
          fundingStatus: &nbsp; <div className="text-green-200">Funded</div>
        </div>
      )
    } else {
      return (
        <div className="text-sm font-small text-green-500 flex truncate">
          fundingStatus: &nbsp;{' '}
          <div className="text-yellow-200">Funding in Process</div>
        </div>
      )
    }
  }

  // return (
  //   <div>
  //     <Link key={item.id} href={`/loan/${item.id}`}>
  //       <a>
  //         <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
  //           <dd className="pb-6 flex items-baseline sm:pb-7">
  //             <div className="flex flex-col">
  //               <div className="mb-3">
  //                 <p className="text-xl font-semibold text-gray-900">
  //                   name: {item.name}
  //                 </p>
  //                 <p className="text-2sm text-gray-500">
  //                   {processDescription(item.description)}
  //                 </p>
  //               </div>
  //               <div>
  //                 <p className="text-sm font-medium text-gray-500 flex truncate">
  //                   {item.boxState}
  //                 </p>
  //                 {getFundStatus(item.isFunded)}
  //               </div>
  //             </div>
  //             <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
  //               <div className="text-sm">
  //                 <span className="font-medium text-indigo-600 hover:text-indigo-500">
  //                   View loan
  //                   <span className="sr-only"> {item.name} stats</span>
  //                 </span>
  //               </div>
  //             </div>
  //           </dd>
  //         </div>
  //       </a>
  //     </Link>
  //   </div>
  // )

  const getLine = (title, description, colorParam) => {
    var styleClass = 'text-sm font-small'
    if (colorParam !== null && colorParam !== undefined) {
      switch (colorParam) {
        case 'yellow':
          styleClass = styleClass.concat(' text-yellow-500')
          break
      }
    } else {
      styleClass = styleClass.concat(' text-green-500')
    }

    return (
      <p className={styleClass} style={{ overflowWrap: 'anywhere' }}>
        {title}: {description}
      </p>
    )
  }

  return (
    <div>
      <Link key={loan.id} href={`/loan/${loan.id}`}>
        <a>
          <div className="relative bg-gray-900 pt-5 px-4 pb-8 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
            <dd className="pb-6 flex items-baseline sm:pb-7">
              <div className="flex-col">
                {getLine('name', loan.name, 'yellow')}
                {getLine('description', loan.description)}
                {getLine('fundingGoalInErgs', loan.fundingGoalInErgs)}
                {getLine('deadline', 'Block ' + loan.deadline)}
                {getLine('boxState', loan.boxState)}
                {getLine('interestRate', loan.interestRate + '%')}
                {getFundStatus(loan.isFunded)}
                {getLine('borrowerPk', loan.borrowerPk)}
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gray-900 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <span className="font-medium text-green-200 hover:text-green-600">
                    View loan
                    <span className="sr-only"> {loan.name} stats</span>
                  </span>
                </div>
              </div>
            </dd>
          </div>
        </a>
      </Link>
    </div>
  )
}
