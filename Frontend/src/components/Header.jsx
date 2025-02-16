import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-4 px-8">
            <nav className="max-w-6xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold hover:text-green-500 transition-colors">
                    AI Fitness Tracker
                </Link>
                <div className="flex items-center gap-8">
                    <Link to="/challenges" className="hover:text-green-500 transition-colors">
                        Challenges
                    </Link>
                    <div className="flex items-center gap-2">
                        <Link to="/login" className="hover:text-green-500 transition-colors">
                            Login
                        </Link>
                        <span>/</span>
                        <Link to="/signup" className="hover:text-green-500 transition-colors">
                            Signup
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;