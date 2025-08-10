import AuthForm from "../AuthForm"

 function Login() {
    return (
      <section className="flex-center size-full max-sm:px-6">
        <AuthForm type="login" />
        <div className="backgroundWave" />
      </section>
    )
}

export default Login