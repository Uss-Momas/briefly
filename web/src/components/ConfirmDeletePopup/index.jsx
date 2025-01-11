import { TriangleAlert } from "lucide-react";

export default function ConfirmDeletePopup({ isOpen, onClose, onConfirm, text }) {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[51]">
            <div onClick={handleOverlayClick} className="fixed inset-0 bg-gray-900 bg-opacity-50"></div>
            <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg w-96 p-6 z-[999]">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex items-center justify-center rounded-2xl bg-red-50 size-20">
                        <div className="flex items-center justify-center rounded-2xl bg-red-100 size-16">
                            <span className="text-red-600">
                                <TriangleAlert className="size-8" />
                            </span>
                        </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-6">
                        <p>{text}</p>
                        <p>This action cannot be undone.</p>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};