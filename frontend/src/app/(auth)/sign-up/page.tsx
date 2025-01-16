import SignUpPage from '@/features/auth/root_page/SignUpPage.root'

const SignUpRoute = () => {
  return (
      <section className='py-8 w-full lg:w-2/3 mx-auto'>
        <div className=''>
          <h2 className='mb-4'>Create a profile</h2>
          <SignUpPage />
        </div>
      </section>
  )
}

export default SignUpRoute
