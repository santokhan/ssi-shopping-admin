import { twMerge } from "tailwind-merge";
import { NavLabel } from "./NavItem";

export function NavDropdownButton({ label, children }) {
    return (
        <li>
            <button type="button" className={twMerge(
                "py-2.5 px-4 lg:px-5 rounded-full",
                "text-base font-semibold whitespace-nowrap text-[14px]",
                'flex items-center gap-2 hover:bg-black/5',
            )}>
                <NavLabel label={label} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="h-3 w-3">
                    <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </button>
            {children}
        </li>
    );
}


export const Dropdown = ({ children }) => {
    return (
        <>
            <ul className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {children}
            </ul>
        </>
    );
}