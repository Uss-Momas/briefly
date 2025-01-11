import { ChevronLeft, ChevronRight, ExternalLink, Trash2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteProtected, getAllProtectedData } from "../../utils/utils";
import { useAuth } from "../../hooks/useAuth";
import ConfirmDeletePopup from "../ConfirmDeletePopup";
import Spinner from "../Spinner";

export default function AdminUsersTable({ refreshTrigger }) {
    const { auth } = useAuth();
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const loadData = async () => {
        try {
            setIsLoading(true);
            const { meta, users } = await getAllProtectedData(`/users?page=${currentPage}&limit=${10}`, auth.token);
            setData(users);
            setPrevPage(meta.prevPage);
            setNextPage(meta.nextPage);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log('ADMIN USERS TABLE COMPONENT ERROR:', error);
        }
    }

    const handleDelete = async () => {
        try {
            if (deleteId) {
                await deleteProtected(`/users/${deleteId}`, auth.token);
                setData(data.filter((item) => item.id !== deleteId));
                setIsModalOpen(false);
                setDeleteId(null);
            }
        } catch (error) {
            console.log('URL TABLE COMPONENT ERROR:', error);
        }
    }

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setDeleteId(null);
    };

    useEffect(() => {
        loadData();
    }, [currentPage, refreshTrigger]);

    return (
        <>
            <div className="flex flex-col gap-6">
                <div className="border overflow-x-auto rounded-lg">
                    <table className="w-full min-w-[600px] divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left text-sm font-medium text-gray-800 px-4 py-3">Name</th>
                                <th className="text-left text-sm font-medium text-gray-800 px-4 py-3">Email</th>
                                <th className="text-left text-sm font-medium text-gray-800 px-4 py-3">Role</th>
                                <th className="text-left text-sm font-medium text-gray-800 px-4 py-3">Created At</th>
                                <th className="text-center text-sm font-medium text-gray-800 px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {
                                isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-10">
                                            <Spinner size={35} color="text-purple-700" />
                                        </td>
                                    </tr>
                                ) :
                                    (data.length === 0 ?
                                        <tr>
                                            <td colSpan={5} className="text-center text-gray-400 p-4 text-sm">No data</td>
                                        </tr> :
                                        (data.map((item, key) => {
                                            const createdAt = new Intl.DateTimeFormat('fr-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(item.createdAt));

                                            return (<tr key={key} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm truncate max-w-[300px] transition-transform delay-75 capitalize" aria-label={`${item.firstName} ${item.lastName}`}>
                                                    {`${item.firstName} ${item.lastName}`}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {item.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm capitalize">
                                                    {item.role.designation}
                                                </td>
                                                <td className="px-4 py-3 text-sm text-gray-500 min-w-32">
                                                    {createdAt}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex justify-center gap-2">
                                                        <button onClick={() => openDeleteModal(item.id)} className="hover:bg-red-50 rounded-lg p-2" title="Delete User">
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>);
                                        })))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex items-center gap-4 text-purple-700">
                        <button
                            onClick={() => {
                                if (prevPage) {
                                    setCurrentPage(prevPage);
                                }
                            }}
                            disabled={prevPage ? false : true} className={`${prevPage ? 'transition-transform ease-in hover:scale-125 delay-75' : 'text-gray-500'}`}>
                            <ChevronLeft className="size-9 sm:size-10" />
                        </button>
                        <button
                            onClick={() => {
                                if (nextPage) {
                                    setCurrentPage(nextPage);
                                }
                            }}
                            disabled={nextPage ? false : true} className={`${nextPage ? 'transition-transform ease-in hover:scale-125 delay-75' : 'text-gray-500'}`}>
                            <ChevronRight className="size-9 sm:size-10" />
                        </button>
                    </div>
                </div>
            </div>
            {/* CONFIRM DELETE POPUP */}
            <ConfirmDeletePopup
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                text={"Are you sure you want to delete the user?"} />
        </>
    );
}