export default function SectionHeader({
  className,
  primaryText,
  heading,
  paragraph
}) {
  return (
    <div
      className={
        className + ' mx-auto mb-16 max-w-[590px] text-center md:mb-20'
      }
      data-wow-delay="0s"
    >
      <span className="mb-3 text-lg font-bold uppercase text-primary sm:text-xl">
        {primaryText}
      </span>
      <h2 className="mb-3 text-3xl font-bold leading-tight text-black dark:text-white md:text-[45px]">
        {heading}
      </h2>
      <p className="text-lg font-medium text-body-color-2 dark:text-body-color">
        {paragraph}
      </p>
    </div>
  )
}
