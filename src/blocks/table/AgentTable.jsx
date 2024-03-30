import { Fragment } from "react"
import ActionDelete from '../../components/action-buttons/Delete';
import ActionEdit from '../../components/action-buttons/Edit';
import Pagination from '../../components/table/pagination/Pagination';
import { Add } from "iconsax-react";
import { Link } from "react-router-dom";

const AgentDetails = ({ agent }) => {
    if (!agent) {
        return null;
    }

    return (
        <div className="flex w-72 flex-row items-center space-x-2 rounded-lg text-gray-800">
            <div className="grid h-20 w-20 flex-shrink-0 place-items-center rounded-xl border bg-gray-50">
                <img src={agent.photo} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
                <h3 className="text-base font-semibold leading-relaxed">{agent.display_name}</h3>
                <p className="text-sm text-gray-400 font-normal">{agent.category}</p>
                <p className="text-sm font-medium">{agent.phone}</p>
            </div>
        </div>
    )
}

const StatusIndicator = ({ status }) => {
    if (!status) {
        return null;
    }

    let backgroundColor, textColor, labelText;

    switch (status.toLowerCase()) {
        case 'active':
            backgroundColor = 'bg-green-100';
            textColor = 'text-green-600';
            labelText = 'Active';
            break;
        case 'inactive':
            backgroundColor = 'bg-red-100';
            textColor = 'text-red-600';
            labelText = 'Inactive';
            break;
        default:
            backgroundColor = 'bg-gray-100';
            textColor = 'text-gray-600';
            labelText = 'Unknown';
    }

    return (
        <span className={`inline-flex justify-center rounded-full px-4 py-2 text-sm font-semibold ${backgroundColor} ${textColor} hover:bg-${status}-200`}>
            {labelText}
        </span>
    );
};

const Action = ({ agent }) => {
    if (!agent) {
        return null;
    }

    function onEdit() {

    }
    function onDelete() {

    }

    return (
        <div className="flex gap-3">
            <ActionEdit onEdit={onEdit} />
            <ActionDelete onDelete={onDelete} />
        </div>
    );
}


const AgentRow = ({ agent }) => {
    if (!agent) {
        return null;
    }

    return (
        <tr className="border-b bg-white">
            <td className="px-6 py-4 font-medium text-gray-900">
                <AgentDetails agent={agent} />
            </td>
            {/* created on */}
            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                {new Date(agent.created_on).toLocaleString()}
            </td>
            <td className="px-6 py-4">
                <StatusIndicator status={agent.status} />
            </td>
            <td className="px-6 py-4">
                {null}
            </td>
            <td className="px-6 py-4">
                <Action agent={agent} />
            </td>
        </tr>
    )
}


const TableTopSection = () => {
    return (
        <div className="relative flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
            <div className="w-full md:w-1/2">
                <h2 className="text-2xl lg:text-3xl font-medium text-gray-900">All Properties</h2>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
                <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg aria-hidden="true" className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input type="text" id="simple-search" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" placeholder="Search" required />
                    </div>
                </form>
                <Link to='create' className="flex items-center gap-1 justify-center rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <Add className="h-4 w-4" />Add new property
                </Link>
            </div>
        </div >
    );
};

const AgentTable = ({ agents }) => {
    return (
        <div className="space-y-4">
            <TableTopSection />
            <div className="bg-white p-4 space-y-4">
                <div className="w-full overflow-x-auto">
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
                                agents.map((agent, i) => {
                                    return (
                                        <Fragment key={i}>
                                            <AgentRow agent={agent} />
                                        </Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination totalPages={[1, 2, 3, 4, 5]} currentPage={1} />
            </div>
        </div>
    )
}

export default AgentTable;