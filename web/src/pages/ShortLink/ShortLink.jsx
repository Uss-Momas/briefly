import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

import { Copy, CopyCheck, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import Pagination from "@/components/Pagination/Pagination";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";


const schema = z.object({
    url: z.string().url({
        message: 'Url is not valid',
    }),
});

export default function ShortLink() {
    const { auth, loading } = useAuth();

    if (loading) {
        return (<></>);
    }

    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
        resolver: zodResolver(schema),
    });

    const [shortenedCode, setShortenedCode] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [shortlinks, setShortlinks] = useState([]);
    const [paginationMetaData, setPaginationMetaData] = useState({});
    const [currentPage, setCurrentPage] = useState(1);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null);

    useEffect(() => {
        getAllLinks(currentPage);
    }, []);

    async function getAllLinks(page = 1) {
        try {
            const response = await axios.get(`/shortlinks?page=${page}`, {
                headers: { "Content-Type": 'application/json', Authorization: `Bearer ${auth.token}` },
            });
            console.log(response.data);
            const links = response.data.shortlinks;
            const meta = response.data.meta;
            setShortlinks(links);
            setPaginationMetaData(meta)
        } catch (error) {
            console.log(error);

        }
    }

    async function OnSubmit(data) {
        try {
            console.log(data);
            const response = await axios({
                method: 'post',
                url: '/shortlinks',
                data: {
                    originalUrl: data.url,
                },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    "Content-Type": 'application/json',
                }
            });
            const responseData = response.data;
            console.log(responseData);
            setShortenedCode(`http://localhost:3333/${responseData.shortlink.code}`);
            getAllLinks(currentPage);
            // reset();
        } catch (error) {
            setError("root", {
                message: 'Some Error',
            })
        }
    }

    function handlePageChange(page) {
        getAllLinks(page);
    }

    async function copyToClipboard(text) {
        return await navigator.clipboard.writeText(text);
    }

    async function handleCopyClick() {
        await copyToClipboard(shortenedCode);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    }

    // Trigger modal on delete button click
    const handleDeleteClick = (link) => {
        setSelectedLink(link); // Set the link to be deleted
        setIsModalOpen(true);  // Open the modal
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLink(null);
    };

    // Confirm delete
    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/shortlinks/${selectedLink.id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
            // Remove the deleted link from the shortlinks state
            setShortlinks((prevLinks) => prevLinks.filter((link) => link.id !== selectedLink.id));
            // setCurrentPage(paginationMetaData.currentPage);
            // getAllLinks(currentPage);
            handleCloseModal(); // Close the modal after deletion
        } catch (error) {
            console.error("Failed to delete link:", error);
        }
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className="flex flex-grow justify-center items-center">
                <div className="flex flex-col w-full max-w-5xl bg-white p-8 shadow-lg rounded-lg mt-4 mb-4">
                    <div className='flex flex-col gap-5 w-full rounded-xl mt-5 bg-white shadow-sm'>
                        <h1 className='font-semibold text-2xl text-gray-700'>Paste your link here to be shortened</h1>
                        <div>
                            <form className='flex flex-row items-center gap-4' onSubmit={handleSubmit(OnSubmit)}>
                                <input {...register("url")} type="text" className='flex-grow border rounded-lg p-3 w-full border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all' placeholder="http://example.com" />
                                <button disabled={isSubmitting} className='flex-shrink-0 rounded-full p-3 bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-800 transition-all'>{isSubmitting ? "Submitting..." : "Short Link"}</button>
                            </form>
                            {errors.url && (
                                <span className="text-red-500 mt-1 block">{errors.url.message}</span>
                            )}
                        </div>
                        <div className='flex flex-col gap-2 mt-4'>
                            <span className="text-gray-500">Here is your shortened link:</span>
                            <div className='flex flex-row border border-purple-600 rounded-lg p-3 items-center'>
                                <input
                                    className='flex-grow disabled:bg-white disabled:text-gray-500 outline-none'
                                    type="text"
                                    disabled
                                    placeholder="your shortened url here..."
                                    value={shortenedCode}
                                />
                                <button onClick={handleCopyClick} className='ml-3'>
                                    {isCopied ? <CopyCheck className="text-green-600" /> : <Copy className="text-gray-600" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border rounded-lg bg-white shadow-md mt-8 p-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Shortened URLs List</h2>
                        <table className="min-w-full table-auto border-collapse">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-center px-6 py-3 text-gray-600">Original URL</th>
                                    <th className="text-center px-6 py-3 text-gray-600">Short URL</th>
                                    <th className="text-center px-6 py-3 text-gray-600">Clicks</th>
                                    <th className="text-center px-6 py-3 text-gray-600">Date</th>
                                    <th className="text-center px-6 py-3 text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    shortlinks.length > 0 ? shortlinks.map((link, idx) => {
                                        const createdAt = new Date(link.createdAt).toLocaleString();
                                        return (
                                            <tr key={idx} className="border-t text-gray-700 text-sm">
                                                <td className="px-6 py-4 break-all">{link.originalUrl}</td>
                                                <td className="px-6 py-4 break-all text-blue-600">
                                                    <a target="_blank" href={`${window.location.origin}/${link.code}`}>{`${window.location.origin}/${link.code}`}</a>
                                                </td>
                                                <td className="text-center px-6 py-4">100</td>
                                                <td className="text-center px-6 py-4">{createdAt}</td>
                                                <td className="text-center px-6 py-4 space-x-3">
                                                    <button className="text-blue-600 hover:text-blue-800 transition-colors border-none">
                                                        {<Copy />}
                                                    </button>
                                                    <button onClick={() => handleDeleteClick(link)} className="text-red-600 hover:text-red-800 transition-colors border-none">
                                                        <Trash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    }) : (<tr>
                                        <td colSpan="4" className="text-center px-6 py-4 text-gray-500">
                                            No data available
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    <Pagination className="flex justify-center items-center space-x-2 mt-2" currentPage={paginationMetaData.currentPage} totalPages={paginationMetaData.totalPages} onPageChange={handlePageChange} />
                    {/* Modal */}
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleConfirmDelete}
                        link={selectedLink} // Pass the selected link to the modal
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}