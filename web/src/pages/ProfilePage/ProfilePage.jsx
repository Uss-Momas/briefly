import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import useAuth from "@/hooks/useAuth";

export default function ProfilePage() {
    const { auth, loading } = useAuth();
    if (loading) {
        return (<div></div>)
    }
    const user = auth.user;

    return (
        <div>
            <Header />
            <main className="flex items-center justify-center min-h-dvh">
                <div className="flex flex-col items-center gap-2 w-1/2 bg-white p-6 rounded-lg shadow-lg">
                    <img
                        src="https://via.placeholder.com/100"
                        alt="Profile"
                        className="rounded-full w-24 h-24"
                    />
                    <form className="w-3/4 gap-2">
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="name">Name</label>
                            <input className="w-full p-2 border rounded-md" type="text" id="name" value={user.name} disabled />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="email">Email</label>
                            <input className="w-full p-2 border rounded-md" type="text" id="email" value={user.email} disabled />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="role">Role</label>
                            <input className="w-full p-2 border rounded-md" type="text" id="role" value={user.role.designation} disabled />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="px-4 py-2 border rounded text-blue-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition-colors"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}