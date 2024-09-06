import fb from '../../assets/social-media/fb.svg';
import linkedIn from '../../assets/social-media/linkedIn.svg';
import insta from '../../assets/social-media/insta.svg';
import x from '../../assets/social-media/x.svg';
import yt from '../../assets/social-media/yt.svg';

export default function Footer() {
    return (
        <footer className='h-32 bg-black text-zinc-200 px-28 flex flex-col justify-center'>
            <div className='flex items-center justify-between mb-5'>
                <p>© 2024 Ussumane Momade. All rights reserved</p>
                <h1 className='font-bold text-3xl'>LOGO</h1>
            </div>
            <div className='flex items-center justify-between border-t border-zinc-500 pt-3 mb-2'>
                <nav className='flex items-center gap-16'>
                    <a href="">Home</a>
                    <a href="">About</a>
                    <a href="">Contact</a>
                </nav>
                <nav className='flex items-center gap-2'>
                    <a href="">
                        <img src={fb} alt="facebook" />
                    </a>
                    <a href="">
                        <img src={linkedIn} alt="linkedIn" />
                    </a>
                    <a href="">
                        <img src={x} alt="twitter/x" />
                    </a>
                    <a href="">
                        <img src={yt} alt="youtube" />
                    </a>
                    <a href="">
                        <img src={insta} alt="instagram" />
                    </a>
                </nav>
            </div>
        </footer>
    );
}