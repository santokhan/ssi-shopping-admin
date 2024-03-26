import { Edit, Trash } from "iconsax-react"
import { Fragment } from "react"

const AgentDetails = ({ data }) => {
    return (
        <div className="flex w-72 flex-row items-center space-x-2 rounded-lg text-gray-800">
            <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-xl border bg-gray-50" />
            <div className>
                <h3 className="text-base font-semibold leading-relaxed">{"Property Type"}</h3>
                <p className="text-sm text-gray-400 font-normal">{"Villa"}</p>
                <p className="text-sm font-medium">{"+971 50 123 4567"}</p>
            </div>
        </div>
    )
}

const AgentRow = ({ data }) => {
    return (
        <tr className="border-b bg-white">
            <td className="px-6 py-4 font-medium text-gray-900">
                <AgentDetails />
            </td>
            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {"30 December, 2022"}
            </td>
            <td className="px-6 py-4">
                <span className="inline-flex justify-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600 hover:bg-green-200">Active</span>
            </td>
            <td className="px-6 py-4">
                {"8,345"}
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-3">
                    <button type="button" className="font-medium rounded-full text-sm text-center inline-flex items-center hover:text-green-500">
                        <Edit className="w-5 h-5" />
                    </button>
                    <button type="button" className="font-medium rounded-full text-sm text-center inline-flex items-center hover:text-red-500">
                        <Trash className="w-5 h-5" />
                    </button>
                </div>
            </td>
        </tr>
    )
}


const AgentTable = () => {
    return (
        <div className="w-full relative overflow-x-auto bg-white p-4">
            <table className="w-full text-sm text-gray-500 rtl:text-right">
                <thead className="bg-gray-100 text-xs font-semibold uppercase text-gray-700">
                    <tr>
                        <th scope="col" className="text-start rounded-l-lg px-6 py-3">Agent Name</th>
                        <th scope="col" className="text-start px-6 py-3">Date Added</th>
                        <th scope="col" className="text-start px-6 py-3">Status</th>
                        <th scope="col" className="text-start px-6 py-3">Properties</th>
                        <th scope="col" className="text-start rounded-r-lg px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [0, 1].map((e, i) => {
                            return (
                                <Fragment key={i}>
                                    <AgentRow />
                                </Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AgentTable;