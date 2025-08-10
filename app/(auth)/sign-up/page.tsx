import AuthForm from "../AuthForm"

function SignUp() {
  return (
      <section className="flex-center size-full max-sm:px-6">
        <AuthForm type="signUp" />
        <div className="backgroundWave" />
      </section>
  )
}

export default SignUp