import Link from 'next/link'
import APP_ROUTES from '@/constants/routes'
import { buttonVariants } from '../ui/button'

const Navbar = () => {
    return (
        <nav className='h-[4rem] center'>
            <div className='box flex justify-end items-center gap-4 text-gray-800'>
                <Link className={buttonVariants({variant: 'outline'})} href={APP_ROUTES.sign_in}>Sign in</Link>
                <Link className={buttonVariants({variant: 'outline'})} href={APP_ROUTES.sign_up}>Sign up</Link>
            </div>
        </nav>
    )
}

export default Navbar
