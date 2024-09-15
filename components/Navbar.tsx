'use client';

import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Navbar: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (darkMode) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0 text-xl font-bold text-gray-800 dark:text-white">
                        <span className="text-blue-500">AI</span> Code and DS Assistant
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-6">
                    {['Home', 'Code Assistance', 'Data Structures', 'NexaMind'].map((item) => (
                        <a
                            key={item}
                            href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 px-2 py-1"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center">
                    <Switch
                        checked={darkMode}
                        onChange={toggleDarkMode}
                        className={`${darkMode ? 'bg-blue-500' : 'bg-gray-200'
                            } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300`}
                    >
                        <span
                            className={`${darkMode ? 'translate-x-6' : 'translate-x-1'
                                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
                        />
                        {darkMode ? (
                            <MoonIcon className="w-5 h-5 text-white absolute left-1 top-0.5" />
                        ) : (
                            <SunIcon className="w-5 h-5 text-yellow-500 absolute right-1 top-0.5" />
                        )}
                    </Switch>
                </div>

                <div className="flex md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {['Home', 'Code Assistance', 'Data Structures', 'NexaMind'].map((item) => (
                            <a
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className="block text-gray-800 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
                            >
                                {item}
                            </a>
                        ))}
                        <div className="pt-4">
                            <Switch
                                checked={darkMode}
                                onChange={toggleDarkMode}
                                className={`${darkMode ? 'bg-blue-500' : 'bg-gray-200'
                                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300`}
                            >
                                <span
                                    className={`${darkMode ? 'translate-x-6' : 'translate-x-1'
                                        } inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300`}
                                />
                                {darkMode ? (
                                    <MoonIcon className="w-5 h-5 text-white absolute left-1 top-0.5" />
                                ) : (
                                    <SunIcon className="w-5 h-5 text-yellow-500 absolute right-1 top-0.5" />
                                )}
                            </Switch>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
