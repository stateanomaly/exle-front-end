const teamData = [
  {
    name: 'ABCD Project Community',
    title: 'Project Lead: Josh Akpan',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    name: 'Vision For Kenya',
    title: 'Community Lead: Denicio Bernier',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]

export default function GlobalTeam() {
  return (
    <div className="mx-4 flex flex-wrap">
      {teamData.map((item, index) => {
        const { name, title, text } = item
        return (
          <div className="w-full px-4 md:w-1/2" key={index}>
            <div className="relative z-10 mb-10 overflow-hidden rounded-[10px] bg-white px-6 py-8 dark:bg-[#131B4D] sm:p-10 md:p-8 xl:p-10">
              <div className="absolute right-0 top-0 z-[-1]">
                <img src="images/card-accent-shape.svg" alt="shape" />
              </div>
              <div className="mb-8 flex items-center">
                <div className="mr-5 h-20 w-full max-w-[80px] overflow-hidden rounded">
                  <img src="images/avatar-small.jpeg" alt="author" />
                </div>
                <div className="w-full">
                  <h3 className="mb-1 text-lg font-semibold text-dark dark:text-white">
                    {name}
                  </h3>
                  <p className="text-sm font-medium text-body-color-2 dark:text-white">
                    {title}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-base font-medium leading-snug text-body-color-2 dark:text-body-color">
                  {text}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
