import { NavItem } from "./NavItem";
import { NavDropdownButton } from "./Dropdown";
import { navList } from '../../utils/navbar';

export const NavList = () => {
    return (
        <>
            <ul className="flex items-center justify-center gap-1">
                {
                    navList.map((nav, i) => {
                        const { label, to, children } = nav;
                        if (children) {
                            return (
                                <NavDropdownButton label={label} key={i}>
                                    {/* <Dropdown /> */}
                                </NavDropdownButton>
                            )
                        } else {
                            return (
                                <NavItem label={label} to={to} key={i} />
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

export default NavList;