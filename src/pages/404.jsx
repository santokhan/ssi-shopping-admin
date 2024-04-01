import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">404 - Page Not Found</h2>
                <p className="text-gray-600 mb-4">Sorry, the page you are looking for does not exist.</p>
                <Link to={"/"} className="bg-dark-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-dark-blue-600">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
