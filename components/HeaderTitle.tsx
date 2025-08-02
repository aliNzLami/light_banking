function HeaderTitle({title, description}: HeaderTitleProps) {
  return (
    <div className="flex flex-col gap-1">
        <h1 className="text-[24px] leading-[30px] lg:text-30 font-semibold text-gray-900">
            { title }
        </h1>
        <p className="text-[14px] leading-[20px] lg:text-16 font-normal text-gray-600">
            { description }
        </p>
    </div>
  )
}

export default HeaderTitle