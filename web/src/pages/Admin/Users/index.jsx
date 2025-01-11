import AdminUsersTable from "../../../components/AdminUsersTable";
import Footer from "../../../components/Footer";
import UserHeader from "../../../components/UserHeader";

export default function Users() {
    return (
        <div className="min-h-dvh bg-gradient-to-r from-zircon-50 via-zircon-100 to-zircon-50">
            <UserHeader />
            <main>
                <section className="bg-white/30 border border-purple-800/15 rounded-lg shadow-lg p-4 mx-auto my-6 max-w-5xl sm:p-6 lg:p-8">
                    <div className="flex flex-col gap-4 bg-white shadow-lg rounded-lg overflow-x-auto p-4">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl  text-gray-600 font-semibold leading-tight">
                            Users
                        </h1>
                        <AdminUsersTable refreshTrigger={() => { }} />
                    </div>
                </section>
                <section>
                </section>
            </main>
            <Footer />
        </div>
    );
}