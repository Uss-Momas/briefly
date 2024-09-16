import Button from "@/components/Button/Button";
import Header from "@/components/Header/Header";

function LaunchingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Header />

      {/* Main section */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">The easiest way to <br /> shorten your links</h1>
          <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-full">Get Started</button>
            <button className="text-purple-600 px-6 py-3 border-2 border-purple-600 rounded-full">Watch Tutorial Video</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="text-center mb-4">
          © 2024 Chatton Nunes. All rights reserved
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Home</a>
          <a href="#" className="text-gray-400 hover:text-white">About</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact</a>
        </div>
      </footer>
    </div>
  );
}

export default LaunchingPage;
