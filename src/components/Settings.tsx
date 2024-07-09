import React from 'react';

interface Props {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

function Settings({ darkMode, setDarkMode }: Props) {
    return (
        <div className="mb-8 flex justify-end">
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
    );
}

export default Settings;