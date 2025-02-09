import MemberPasswordSetPage from '@/features/auth/root_page/MemberPasswordSetPage.root'

const MemberPasswordSetRoute = () => {
  return (
    <section className='py-8 w-full lg:w-2/3 mx-auto h-screen flex flex-col items-center justify-center'>
      <div className='w-full'>
        <h2 className='mb-4'>Set Password</h2>
        <MemberPasswordSetPage />
      </div>
    </section>
  )
}

export default MemberPasswordSetRoute
