import Button from "@/components/Button/Button";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import fb from '../../assets/social-media/fb.svg';
import linkedIn from '../../assets/social-media/linkedIn.svg';
import insta from '../../assets/social-media/insta.svg';
import yt from '../../assets/social-media/yt.svg';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LaunchingPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  // Scroll handler function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (state?.scrollTo) {
      scrollToSection(state.scrollTo);
    }
  }, [state]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Header scrollToSection={scrollToSection} />

      {/* Main section */}
      <main>
        <section id="home" className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">The easiest way to <br /> shorten your links</h1>
            <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div className="flex justify-center space-x-4">
              <button onClick={() => { navigate('/shortlink-anonimous') }}
                className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 hover:scale-105 transition-transform duration-300">
                Get Started
              </button>
              <button className="text-purple-600 px-6 py-3 border-2 border-purple-600 rounded-full">Watch Tutorial Video</button>
            </div>
          </div>
        </section>
        {/* ABOUT SECTION */}
        <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100">
          <div className="text-center max-w-4xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Briefly</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Briefly is a modern, user-friendly URL shortener designed to make link management easier for individuals and businesses alike.
              Whether you're sharing links across social media, tracking analytics, or simplifying long URLs, Briefly provides a seamless solution to shorten, manage, and analyze your links in a matter of seconds.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe in providing simplicity without compromising on performance. With detailed analytics, customizable short links, and secure link management, Briefly ensures your URLs remain clean, organized, and effective.
            </p>
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
          <div className="text-center max-w-3xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-700 mb-6">
              Have questions or need support? We’re here to help! Feel free to reach out for assistance with Briefly.
            </p>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <a href="mailto:support@briefly.com" className="text-lg text-purple-600 underline hover:text-purple-800">
                support@briefly.com
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}