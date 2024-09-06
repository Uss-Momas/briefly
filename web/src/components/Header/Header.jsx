export default function Header() {
    return (
        <header className='bg-white h-16 text-purple-700 flex items-center justify-between px-32'>
            <div className='flex gap-24'>
                <strong>LOGO</strong>
                <span>Link Shortener</span>
            </div>
            <div className='flex gap-4'>
                <button className='border rounded-md p-3 border-purple-700'>Login</button>
                <button className='border rounded-md p-3 bg-purple-700 text-white'>Sign Up</button>
            </div>
        </header>
    );
}