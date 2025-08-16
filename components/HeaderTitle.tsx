function HeaderTitle({text1, text2 = "", description}: HeaderTitleProps) {
  return (
    <div className="flex flex-col gap-1">
        <h1 className="text-[24px] leading-[30px] lg:text-30 font-semibold">
          <span className="text-gray-900 txt-darkMode me-2">
            { text1 }
          </span>
          {
            text2 &&
            <span className="blueText blueTxtDarkMode">
              { text2 }
            </span>
          }
        </h1>
        <p className="text-[14px] leading-[20px] lg:text-16 font-normal text-gray-600 txt-darkMode">
            { description }
        </p>
    </div>
  )
}

export default HeaderTitle