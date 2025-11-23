'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';

export default function BusinessAdminDashboardHeader() {
    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: 'File Management', href: '/business/file-management/my-files' },
        { name: 'Users', href: '/business/manage-users' },
        { name: 'Device Management', href: '/business/device-management/overview' },
        { name: 'Device Moderation', href: '/business/device-moderation' },
        { name: 'Dashboard', href: '/business/dashboard' },
    ];

    // Close dropdown if click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('#avatar-dropdown')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();
        // Perform logout logic here (e.g., clear tokens, call API)
        Cookies.remove("authToken");
        Cookies.remove("authRole");
        // Then redirect to logout page
        router.push("/login");
    }

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[999999] transition-all duration-500 bg-transparent ${isSticky ? "shadow-md py-1" : "py-3"}`}
        >
            {isSticky && <div className='absolute backdrop-blur-[20px] w-full h-full top-0 left-0 z-10'></div>}

            <nav className="mx-auto flex gap-3 max-w-7xl items-center justify-between mt-5 mb-5 md:px-6 px-4 lg:px-4 xl:px-0 middle:px-5 z-20 relative">

                <div className='hamburger flex gap-5 items-center'>
                    <svg
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='cursor-pointer block xl:hidden lg:hidden'
                        width="30"
                        height="30"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M13.5 2H0.5" stroke="#97C1A9" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.5 7H0.5" stroke="#97C1A9" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M13.5 12H0.5" stroke="#97C1A9" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>
                        <Link href={'#'}>Logo</Link>
                    </div>
                </div>

                <div className='lg:flex xl:flex gap-2 hidden'>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`py-3 rounded-2xl cursor-pointer min-w-[200px] w-full text-center transition-all
                                ${pathname === link.href
                                    ? 'bg-[#98C1A9] text-white'
                                    : 'text-[#848884] hover:bg-[#98C1A9] hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className='relative' id="avatar-dropdown">
                    <button className='cursor-pointer flex items-center gap-2' onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <Image
                            src={'/dashboard/user-avatar.png'}
                            alt="User Avatar"
                            width={500}
                            height={500}
                            className="rounded-full w-12 h-auto object-cover"
                        />

                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6.5L9.62308 13.3317C9.67142 13.3848 9.72981 13.4272 9.79464 13.4561C9.85947 13.4851 9.92936 13.5 10 13.5C10.0706 13.5 10.1405 13.4851 10.2054 13.4561C10.2702 13.4272 10.3286 13.3848 10.3769 13.3317L17 6.5" stroke="#97C1A9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </button>

                    {dropdownOpen && (
                        <div onClick={() => setDropdownOpen(false)} className='absolute right-0 mt-2 w-48 bg-white rounded-2xl overflow-hidden shadow-lg z-50'>
                            <Link href="/business/user-profile-settings" className={`block px-4 py-2 ${pathname === "/business/user-profile-settings"
                                ? 'bg-[#98C1A9] text-white'
                                : 'text-[#848884] hover:bg-[#98C1A9] hover:text-white'}`}>Profile Settings</Link>
                            <Link onClick={handleLogout} href="/business/logout" className="block px-4 py-2 text-[#848884] hover:bg-[#98C1A9] hover:text-white">Logout</Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed top-0 left-0 h-full w-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out xl:hidden lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                <div className="p-6">
                    {/* Close button */}
                    <div className="flex justify-between items-center mb-8">
                        <Link href={'#'} className="text-lg font-semibold">Logo</Link>

                        <svg onClick={() => setMobileMenuOpen(false)} width="30" height="30" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_295_5666)">
                                <path d="M13.5 0.5L0.5 13.5" stroke="#97C1A9" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M0.5 0.5L13.5 13.5" stroke="#97C1A9" stroke-linecap="round" stroke-linejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_295_5666">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block py-3 px-4 rounded-2xl transition-all min-w-[200px] max-w-[200px]
                                    ${pathname === link.href
                                        ? 'bg-[#98C1A9] text-white text-center'
                                        : 'text-[#848884] hover:bg-[#98C1A9] hover:text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Profile Section */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href="/business/profile-settings"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block py-3 px-4 rounded-2xl mb-2 transition-all
                                ${pathname === "/business/profile-settings"
                                    ? 'bg-[#98C1A9] text-white'
                                    : 'text-[#848884] hover:bg-[#98C1A9] hover:text-white'}`}
                        >
                            Profile Settings
                        </Link>
                        <button
                            onClick={(e) => {
                                handleLogout(e);
                                setMobileMenuOpen(false);
                            }}
                            className="block w-full text-left py-3 px-4 rounded-2xl text-[#848884] hover:bg-[#98C1A9] hover:text-white transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
