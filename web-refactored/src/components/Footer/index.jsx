import { Linkedin, Mail, MessageCircle, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-zinc-900/90 text-white py-12 px-6">
            <div className="flex flex-col justify-center gap-6">
                <div className="flex flex-col gap-10 sm:flex-row">
                    <section className="flex flex-col gap-4">
                        <h1 className="text-xl font-semibold">Briefly</h1>
                        <div className="flex gap-4 text-gray-500">
                            <a href="https://google.com" target="_blank"><Linkedin className="hover:text-white" /></a>
                            <a href="https://google.com" target="_blank"><Twitter className="hover:text-white" /></a>
                            <a href="https://google.com" target="_blank"><MessageCircle className="hover:text-white" /></a>
                        </div>
                        <div className="flex gap-4 text-gray-500 hover:text-white">
                            <Mail />
                            <a href="mailto:contact@briefly.com"><p>contact@briefly.com</p></a>
                        </div>
                    </section>
                    <section className="flex flex-col gap-4">
                        <h2 className="text-lg font-medium">Quick Links</h2>
                        <nav className="text-gray-500">
                            <ul className="flex flex-col gap-4">
                                <li>
                                    <a href="#about" className="hover:text-white">About Us</a>
                                </li>
                                <li>
                                    <a href="#services" className="hover:text-white">Our Services</a>
                                </li>
                            </ul>
                        </nav>
                    </section>
                </div>
                <div className="flex flex-col gap-4 text-gray-500 text-center">
                    <hr className="border-gray-500" />
                    <p>&copy; 2024 Briefly. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}