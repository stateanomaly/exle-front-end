export default function MarketingHeader() {
  return (
    <>
      <div
        className="absolute top-0 left-0 -z-10 h-full w-full opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(180deg,#3e7dff 0%,rgba(62, 125, 255, 0) 100%)'
        }}
      >
        {' '}
      </div>

      <section id="home" className="relative z-10 pt-48 pb-28">
        <div>
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[720px] text-center">
                <h1 className="mb-4 font-bold leading-tight text-black dark:text-white text-[45px]">
                  Welcome to Ergo-Lend
                </h1>
                <p className="mx-auto mb-4 max-w-[620px] text-lg font-medium text-body-color-2 dark:text-white">
                  A person-to-person (P2P) lending platform with easy to use
                  tools to borrow and lend money on the Ergo blockchain.
                </p>

                <div className="pt-8">
                  <a
                    href="https://ergopad.io/projects/ergolend"
                    className="rounded-full bg-blue-600 py-3 px-8 text-base font-semibold text-white hover:bg-opacity-90 dark:hover:bg-opacity-90"
                  >
                    See us on ErgoPad
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute top-0 left-0 -z-10 h-full w-full opacity-20"
          // style="
          //   background-image: linear-gradient(
          //     180deg,
          //     #3e7dff 0%,
          //     rgba(62, 125, 255, 0) 100%
          //   );
          // "
        ></div>
        <img
          src="images/hero-shape-1.svg"
          alt=""
          className="absolute left-0 top-0 -z-10"
        />
        <img
          src="images/hero-shape-2.svg"
          alt=""
          className="absolute right-0 top-0 -z-10"
        />
      </section>
    </>
  )
}
