import { Fragment, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Trash } from 'iconsax-react';

function DeleteModal({ onDelete = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <button
        type="button"
        className="font-medium rounded-full text-sm text-center inline-flex items-center hover:text-red-600"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Trash className="w-5 h-5" />
      </button>

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        as="div"
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 z-[2]" />

        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[3]">
          <div className="relative max-w-lg rounded-lg bg-white p-4 text-center shadow sm:p-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-3.5 h-11 w-11 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="mb-4 text-gray-500">
              Are you sure you want to delete this item?
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                No, cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  // Handle delete action
                  onDelete();
                }}
                className="rounded-lg bg-red-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                Yes, I am sure
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}

export default DeleteModal;
