import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Login(params) {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <main className="m-auto">
                <div className="bg-white flex flex-col gap-5 rounded px-6 py-8 h-auto w-96">
                    <h1 className="font-semibold text-2xl">Login</h1>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="border border-blue-500 rounded px-2 py-1"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="border border-blue-500 rounded px-2 py-1"/>
                        </div>
                    </div>
                    <button className="bg-blue-600 rounded text-white py-2 mt-3">Login</button>
                </div>
            </main>
            <Footer />
        </div>
    );
}