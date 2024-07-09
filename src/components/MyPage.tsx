import React, { useState, useEffect } from 'react';

interface UserInfo {
    firstName: string;
    lastName: string;
}

const MyPage: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo>(() => {
        const savedInfo = localStorage.getItem('userInfo');
        return savedInfo ? JSON.parse(savedInfo) : { firstName: '', lastName: '' };
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }, [userInfo]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-white">マイページ</h2>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white mb-2" htmlFor="firstName">
                    名
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white mb-2" htmlFor="lastName">
                    姓
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
                />
            </div>
            <div className="flex items-center mb-4">
                <label htmlFor="darkModeToggle" className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id="darkModeToggle"
                            className="sr-only"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${darkMode ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-700 dark:text-white font-medium">
                        {darkMode ? 'ダークモード' : 'ライトモード'}
                    </div>
                </label>
            </div>
        </div>
    );
};

export default MyPage;