import { SocialIcon } from 'react-social-icons'

export default function MarketingBlurb() {
  return (
    <section className="relative z-10">
      <div>
        <div
          className="wow fadeInUp border-y border-[#F3F4F4] pt-10 dark:border-[#2D2C4A]"
          data-wow-delay="0s"
        >
          <h2 className="mb-10 text-center text-lg font-bold text-black dark:text-white sm:text-2xl">
            You might have seen us on...
          </h2>

          <div className="-mx-4 flex flex-wrap items-center justify-center">
            <div className="px-4">
              <a
                href="https://ergopad.io/projects/ergolend"
                target="_blank"
                rel="nofollow noopenner"
                className="mb-10 flex max-w-[170px] justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 dark:hover:opacity-100"
              >
                <img
                  src="images/ergopad-32x32.png"
                  alt="ErgoPad"
                  className="mx-auto h-10 text-center block"
                />
              </a>
            </div>
            <div className="px-4">
              <a
                href="https://weqntstakepool.nl/"
                target="_blank"
                rel="nofollow noopenner"
                className="mb-10 flex max-w-[170px] justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 dark:hover:opacity-100"
              >
                <img
                  src="images/weqnt.png"
                  alt="WEQNT Cardano Stakepool"
                  className="mx-auto h-10 text-center block"
                />
              </a>
            </div>
            <div className="px-4">
              <a
                href="https://www.youtube.com/watch?v=Wzsg94wcc_om"
                target="_blank"
                rel="nofollow noopenner"
                className="mb-10 flex max-w-[170px] justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 dark:hover:opacity-100"
              >
                <img
                  src="images/ergopulse.png"
                  alt="lineicons"
                  className="mx-auto h-10 text-center block"
                />
              </a>
            </div>
            <div className="px-4">
              <SocialIcon
                url="https://twitter.com/ErgoLend"
                className="mb-10 flex max-w-[170px] justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 text-white dark:hover:opacity-100"
              />
            </div>
            <div className="px-4">
              <SocialIcon
                url="https://www.youtube.com/watch?v=Wzsg94wcc_o"
                className="mb-10 flex max-w-[170px] justify-center opacity-70 grayscale hover:opacity-100 hover:grayscale-0 text-white dark:hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
