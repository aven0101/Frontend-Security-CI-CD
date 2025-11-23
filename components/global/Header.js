'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import LanguageSelector from './LanguageSelector'
import Link from 'next/link'
import { navLinks } from '@/constants/constant'
import { usePathname } from "next/navigation";

export default function Header({ isAuth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const pathname = usePathname();
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50); // add shadow after 50px scroll
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[999999] transition-all duration-500 bg-transparent ${isSticky ? "shadow-md py-1" : "py-3"}`}
        >
            {isSticky &&
                <div className='absolute backdrop-blur-[20px] w-full h-full top-0 left-0 z-10'></div>
            }
            <nav aria-label="Global" className="mx-auto flex gap-3 max-w-7xl items-center justify-between mt-5 mb-5 md:px-6 px-4 lg:px-4 xl:px-0 middle:px-5 z-20 relative">
                <div className="flex lg:flex-1 w-full xl:min-h-[69px] lg:min-h-[62px] md:min-h-[50px] min-h-[44px]">
                    <Link href="/" className="bg-[#43E1A9] font-bold px-4 xl:text-3xl lg:text-lg py-2 lg:px-7 lg:py-1 xl:px-13 md:px-4 md:py-2 rounded-2xl text-white leading-0 flex justify-between items-center">
                        Logo
                    </Link>
                </div>
                <div className='lg:hidden'>
                    <LanguageSelector customClass={'lg:hidden'} />
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-8" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex xl:gap-x-5.5 lg:gap-x-4 border-[#43E1A9] border-1 rounded-2xl py-2 px-2 items-center bg-[url(/images/header-bg.png)] bg-contain">
                    {
                        navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            if (link.subMenu) {
                                return (
                                    <Popover key={link.name} className="relative item">
                                        {({ close }) => (
                                            <>
                                                <PopoverButton className="flex px-2.5 py-2 items-center gap-x-1 xl:text-[1.375rem] lg:text-[1rem] font-bold text-[#FDFDFD] outline-0">
                                                    {link.name}
                                                    <ChevronDownIcon aria-hidden="true" className="size-7 flex-none text-[#FDFDFD]" />
                                                </PopoverButton>

                                                <PopoverPanel
                                                    transition
                                                    className="absolute left-1/2 z-10 mt-3 w-screen max-w-[160%] -translate-x-1/2 overflow-hidden rounded-xl shadow-lg transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in bg-[url(/images/header-bg.png)] bg-contain border-1 border-white backdrop-blur-[20px]"
                                                >
                                                    <div className="p-2">
                                                        {link.subMenu.map((item) => (
                                                            <div
                                                                key={item.name}
                                                                className="group relative flex items-center p-1 xl:text-[1.375rem] lg:text[1rem]"
                                                                onClick={() => { close() }}
                                                            >
                                                                <div className="flex-auto">
                                                                    <Link href={item.href} className="block font-bold text-white">
                                                                        {item.name}
                                                                        <span className="absolute inset-0" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </PopoverPanel>
                                            </>
                                        )}
                                    </Popover>
                                );
                            }

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`item xl:text-[1.375rem] lg:text-[1rem] font-bold px-2.5 py-2 text-[#FDFDFD] dark:text-white outline-0 ${isActive
                                        ? "active"
                                        : ""
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })
                    }
                </PopoverGroup>
                <div className='hidden lg:block'><LanguageSelector customClass={'hidden lg:block'} /></div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link href={isAuth ? '/business/dashboard' : '/login'} className="xl:text-[1.375rem] lg:text-[1rem] flex justify-center items-center font-bold text-[#fdfdfd] border-[#43E1A9] border-1 rounded-2xl lg:px-6 xl:px-6.5 py-4 bg-[url(/images/button-bg.png)] bg-cover bg-no-repeat lg:min-h-[62px] xl:min-h-[69px] xl:min-w-[169px] lg:min-w-[130px]">
                        {isAuth ? 'Dashboard' : 'Login'}
                    </Link>
                </div>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden border z-[9999999] relative">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-full sm:ring-1 sm:ring-gray-900/10 bg-[url(/images/header-bg.png)] bg-contain border-1 border-white backdrop-blur-[20px]">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="bg-[#43E1A9] font-bold px-4 xl:text-3xl lg:text-lg py-[22px] lg:px-7 lg:py-1 xl:px-13 md:px-4 md:py-2 rounded-2xl text-white leading-0 flex justify-between items-center"
                        onClick={() => setMobileMenuOpen(false)}
                        >
                            Logo
                        </Link>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-white"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-8" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
                            <div className="space-y-2 py-6">
                                {
                                    navLinks.map((link) => {
                                        const isActive = pathname === link.href;

                                        if (link.subMenu) {
                                            return (
                                                <Disclosure as="div" className="-mx-3" key={link.name}>
                                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3  xl:text-[1.375rem] lg:text-[1rem] font-bold text-[#FDFDFD]">
                                                        {link.name}
                                                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                                                    </DisclosureButton>
                                                    <DisclosurePanel className="mt-2 space-y-2">
                                                        {link.subMenu.map((item) => (

                                                            <DisclosureButton
                                                                key={item.name}
                                                                as="a"
                                                                href={item.href}
                                                                className="block rounded-lg py-2 pr-3 pl-6 text-[#FDFDFD] dark:text-white outline-0 text-[0.90rem] font-bold"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {item.name}
                                                            </DisclosureButton>
                                                        ))}
                                                    </DisclosurePanel>
                                                </Disclosure>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={`-mx-3 block xl:text-[1.375rem] lg:text-[1rem] font-bold px-2.5 py-2 text-[#FDFDFD] dark:text-white outline-0 ${isActive
                                                    ? "active"
                                                    : ""
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        );
                                    })
                                }
                            </div>
                            <hr className='bg-white' />
                            <div className="py-6">
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
