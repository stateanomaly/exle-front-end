import * as cs from 'classnames'

const timelineEvents = [
  {
    date: 'October 8-10, 2021',
    text: 'ErgoHack II event - Ergo-Lend took first place! This got us rolling with a first version of the UI and a large portion of the ergoscript required to function.'
  },
  {
    date: 'End of Feb, 2022',
    text: 'We completed a full end-to-end test using fully functional ergoscript contracts, scala backend and nextjs front end.'
  },
  {
    date: 'End of March, 2022',
    text: 'Contract bug bash and refactor to fix all found bugs and improve features'
  },
  {
    date: 'May 2, 2022',
    text: 'Staker Snapshot - Snapshot for ergopad stakers who reach any of the staking tiers. Dont forget to whitelist for this event.'
  },
  {
    date: 'May 3, 2022',
    text: 'Contribution period, staker round - The contribution round lasts until May 8th.'
  },
  {
    date: 'May 10, 2022',
    text: 'Seed round whitelisting - Whitelist for the seed round is FCFS. If you stake 25k ergopad tokens (alpha tier), you can access the form one hour earlier, at 13:00 UTC.'
  },
  {
    date: 'May 11, 2022',
    text: 'Contribution period, seed round - The contribution round lasts until May 16th. On May 15th, the waitlist opens and the remaining tokens will be distributed FCFS.'
  },
  {
    date: 'May 17, 2022',
    text: 'Strategic round whitelist - Whitelist is FCFS and those staking 12500 ergopad tokens (mini tier) get early access, at 13:00 UTC.'
  },
  {
    date: 'May 18, 2022',
    text: 'Contribution period, strategic round - The contribution round lasts until May 23rd. On May 22nd, the waitlist opens and the remaining tokens will be distributed FCFS.'
  },
  {
    date: 'May 25, 2022',
    text: 'Ergo-Lend IDO on Ergodex -Liquidity will be added in both Erg/Lend and SigUSD/Lend pairs.'
  },
  {
    date: 'Summer, 2022',
    text: 'Scaling the backend for engineering and performance improvements'
  },
  {
    date: 'Fall, 2022',
    text: 'New features for both front end and backend are planned.  We will be making proposals and submitting soon.'
  }
]

const RenderTimelineObject = ({ item, isLeft = true }) => {
  const { date, text } = item
  return (
    <>
      {
        //only display every other one
        !isLeft && (
          <>
            <div className="w-full px-4 md:w-1/2" />
            <div className="w-full px-4 md:w-1/2" />
          </>
        )
      }
      <div className="w-full px-4 md:w-1/2">
        <div
          className={cs(
            { 'md:mr-3 md:text-right lg:mr-5': isLeft },
            { 'md:ml-3 lg:ml-5': !isLeft },
            'relative z-10 mb-10 rounded-lg bg-light-bg py-8 px-6 dark:bg-dark md:mb-0'
          )}
        >
          <span
            className={cs(
              { 'md:left-auto md:-right-9 lg:-right-11': isLeft },
              { 'md:right-auto md:-left-9 lg:-left-11': !isLeft },
              'absolute top-1/2 left-0 hidden h-4 w-4 -translate-y-1/2 rounded-full border-4 border-primary bg-white dark:border-body-color md:block'
            )}
          />
          <span
            className={cs(
              { '-right-1': isLeft },
              { '-left-1': !isLeft },
              'absolute top-1/2 hidden h-3 w-3 -translate-y-1/2 rotate-45 bg-light-bg dark:bg-dark md:block '
            )}
          />
          <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
            {date}
          </h3>
          <p className="mb-5 text-base font-medium text-body-color-2 dark:text-body-color">
            {text}
          </p>
        </div>
      </div>
    </>
  )
}

export default function Timeline() {
  return (
    <div className="-mx-4 flex justify-center">
      <div className="w-full px-4 lg:w-10/12 xl:w-9/12">
        <div className="relative -mx-4 flex flex-wrap md:py-14 lg:py-20">
          <span className="absolute top-0 left-2 hidden h-full w-[2px] bg-light-bg dark:bg-[#2D2C4A] md:left-1/2 md:block" />
          {timelineEvents.map((value, index) => {
            return (
              <RenderTimelineObject
                item={value}
                key={index}
                isLeft={index % 2 == 0 ? true : false}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
