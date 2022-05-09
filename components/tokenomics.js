import { VictoryPie } from 'victory'
export default function Tokenomics() {
  return (
    <section className="relative z-10">
      <div className=" max-w-7xl mx-auto">
        <div className="rounded-lg bg-light-bg py-12 px-8 dark:bg-[#14102C] sm:py-16 sm:px-14 lg:px-8 xl:px-14">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp mb-12 flex items-center justify-center lg:mb-0"
                data-wow-delay="0s"
              >
                <div id="chart" style={{ minHeight: '312.033px' }}>
                  <VictoryPie
                    data={[
                      { x: '16%', y: 16 },
                      { x: '21%', y: 21 },
                      { x: '11%', y: 11 },
                      { x: '6%', y: 6 },
                      { x: '20%', y: 20 },
                      { x: '5%', y: 5 },
                      { x: '21%', y: 21 }
                    ]}
                    colorScale={[
                      '#3E7DFF',
                      '#2347B9',
                      '#799AE0',
                      '#8696CA',
                      '#1B76FF',
                      '#0092B2',
                      '#59D8E6'
                    ]}
                    labelRadius={({ innerRadius }) => innerRadius + 70}
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="wow fadeInUp mb-9" data-wow-delay="0s">
                <span className="mb-3 text-lg font-bold uppercase text-primary sm:text-xl">
                  TOKEN
                </span>
                <h2 className="mb-3 text-3xl font-bold leading-tight text-black dark:text-white md:text-[45px]">
                  Token Sale
                </h2>
                <p className="text-lg font-medium text-body-color-2 dark:text-body-color">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus condimentum tellus at lectus pulvinar, id auctor
                  felis iaculis. In vestibulum neque sem, at dapibus justo
                  facilisis in.
                </p>
              </div>
              <div className="wow fadeInUp space-y-4" data-wow-delay="0s">
                <p className="flex">
                  <span className="mr-4 h-6 w-6 rounded-full bg-primary" />
                  <span className="text-lg font-medium text-body-color-2 dark:text-body-color">
                    16% Ergopad Staker Round
                  </span>
                </p>
                <p className="flex">
                  <span className="mr-4 h-6 w-6 rounded-full bg-[#2347B9]" />
                  <span className="text-lg font-medium text-body-color-2 dark:text-body-color">
                    21% Ergopad Seed Round
                  </span>
                </p>
                <p className="flex">
                  <span className="mr-4 h-6 w-6 rounded-full bg-[#799AE0]" />
                  <span className="text-lg font-medium text-body-color-2 dark:text-body-color">
                    11% Ergopad Strategic Round
                  </span>
                </p>
                <p className="flex">
                  <span className="mr-4 h-6 w-6 rounded-full bg-[#8696CA]" />
                  <span className="text-lg font-medium text-body-color-2 dark:text-body-color">
                    6% Liquidity (Locked)
                  </span>
                </p>
                <p className="flex">
                  <span className="mr-4 h-6 w-6 rounded-full bg-[#1B76FF]" />
                  <span className="text-lg font-medium text-body-color-2 dark:text-body-color">
                    20% DAO Reserve
                  </span>
                </p>
                <p className="flex">
                  <span className="mr-4 h-6 w-6 rounded-full bg-[#0092B2]" />
                  <span className="text-lg font-medium text-body-color-2 dark:text-body-color">
                    5% Distribution Partner
                  </span>
                </p>
                <p className="flex">
                  <span className="mr-4 h-6 w-6 rounded-full bg-[#59D8E6]" />
                  <span className="text-lg font-medium text-body-color-2 dark:text-body-color">
                    21% Core Team
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 -top-32 -z-10">
        <img src="images/token-sale-shape.svg" alt="shape" />
      </div>
    </section>
  )
}
