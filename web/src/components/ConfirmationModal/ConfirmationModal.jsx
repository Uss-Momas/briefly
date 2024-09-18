export default function ConfirmationModal({ isOpen, onClose, onConfirm, link }) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-700">Delete Shortlink</h3>
                <p className="text-gray-600 mt-2">
                    Are you sure you want to delete this link: <span className="font-bold">{link.originalUrl}</span>?
                </p>
                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}