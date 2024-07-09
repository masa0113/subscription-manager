import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'ホーム' },
        { path: '/mypage', label: 'マイページ' },
    ];

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mb-8">
            <ul className="flex space-x-4">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`px-4 py-2 rounded-md transition-colors duration-300 ${location.pathname === item.path
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};