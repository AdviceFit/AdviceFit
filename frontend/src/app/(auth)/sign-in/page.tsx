import SignInPage from '@/features/auth/root_page/SignInPage.root'

const SignInRoute = () => {
  return (
    <section className='py-8 w-full lg:w-2/3 mx-auto h-screen flex flex-col items-center justify-center'>
      <div className='w-full'>
        <h2 className='mb-4'>Signin</h2>
        <SignInPage />
      </div>
    </section>
  )
}

export default SignInRoute
