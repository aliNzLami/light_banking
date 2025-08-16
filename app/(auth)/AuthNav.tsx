import Link from "next/link"

function AuthNav({text, button, href}: {text: string, button: string, href: string}) {
  return (
        <div className="flex justify-center items-center">
            <span className="text-[14px] leading-[20px] me-2 txt-darkMode">
                { text }
            </span>
            <Link href={href} className="font-bold blueText">
                { button }
            </Link>
        </div>
  )
}

export default AuthNav