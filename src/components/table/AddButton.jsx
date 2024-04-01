import { Add } from "iconsax-react"
import { Link } from "react-router-dom"

const AddButton = ({ to, children }) => {
    return (
        <Link to={to} className="flex items-center gap-1 justify-center rounded-lg bg-dark-blue-500 px-4 py-3 text-sm font-medium text-white focus:outline-none hover:bg-dark-blue-600">
            <Add className="h-5 w-5" />{children}
        </Link>
    )
}

export default AddButton