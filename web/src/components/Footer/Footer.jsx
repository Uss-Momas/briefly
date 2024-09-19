import fb from '../../assets/social-media/fb.svg';
import linkedIn from '../../assets/social-media/linkedIn.svg';
import insta from '../../assets/social-media/insta.svg';
import x from '../../assets/social-media/x.svg';
import yt from '../../assets/social-media/yt.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Footer({ scrollToSection }) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Function to handle navigation and scrolling
    function handleNavigateAndScroll(sectionId) {
        if (pathname !== "/") {
            navigate("/", { state: { scrollTo: sectionId } });
        } else {
            scrollToSection(sectionId);
        }
    };

    return (
        <footer className='bg-black text-gray-200 py-8 px-6 md:px-28'>
            <div className='flex flex-col md:flex-row items-center justify-between mb-6'>
                <p className='text-center md:text-left'>© 2024 Ussumane Momade. All rights reserved</p>
                <h1 className='text-2xl md:text-3xl font-bold text-center md:text-left mt-4 md:mt-0'>LOGO</h1>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between border-t border-gray-500 pt-4'>
                <nav className='flex flex-col md:flex-row items-center gap-6 mb-4 md:mb-0'>
                    <button onClick={() => handleNavigateAndScroll("home")} className='hover:text-gray-400 transition-colors'>Home</button>
                    <button onClick={() => handleNavigateAndScroll("about")} className='hover:text-gray-400 transition-colors'>About</button>
                    <button onClick={() => handleNavigateAndScroll("contact")} className='hover:text-gray-400 transition-colors'>Contact</button>
                </nav>
                <nav className='flex gap-4'>
                    <a href="#" aria-label="Facebook">
                        <img src={fb} alt="Facebook" className='w-6 h-6 hover:opacity-80 transition-opacity' />
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <img src={linkedIn} alt="LinkedIn" className='w-6 h-6 hover:opacity-80 transition-opacity' />
                    </a>
                    <a href="#" aria-label="Twitter/X">
                        <img src={x} alt="Twitter/X" className='w-6 h-6 hover:opacity-80 transition-opacity' />
                    </a>
                    <a href="#" aria-label="YouTube">
                        <img src={yt} alt="YouTube" className='w-6 h-6 hover:opacity-80 transition-opacity' />
                    </a>
                    <a href="#" aria-label="Instagram">
                        <img src={insta} alt="Instagram" className='w-6 h-6 hover:opacity-80 transition-opacity' />
                    </a>
                </nav>
            </div>
        </footer>
    );
}
