import Logo from '../../components/Logo'
import NavList from "./NavList"
import { twMerge } from "tailwind-merge"
import { LoginButton } from "./LoginButton"
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className={twMerge("sticky top-0 z-[2] flex h-16 w-full items-center backdrop-blur-lg")}>
            <div className="mx-auto flex w-full flex-1 items-center justify-between h-full">
                <div className="md:w-2/12 flex-shrink-0 flex">
                    <Link to="/" className="router-link-active router-link-exact-active">
                        <Logo />
                    </Link>
                </div>
                <div className="hidden lg:flex items-center">
                    {/* <NavList /> */}
                    <LoginButton />
                </div>
                <div className="flex items-center justify-center lg:hidden">
                    <button type="button" className={twMerge("text-gray-300 hover:text-gray-50")}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-8 w-8">
                            <path fillRule="evenodd" d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar