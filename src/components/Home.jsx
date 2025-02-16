const Home = () => {
    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="text-center bg-gradient-to-br from-green-500 to-green-600 text-white py-16 rounded-2xl mb-8">
                <h1 className="text-4xl font-bold mb-4">Transform Your Fitness Journey with AI</h1>
                <p className="text-xl mb-8">Get real-time exercise feedback and personalized challenges</p>
                <button className="bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transition-transform">
                    Get Started
                </button>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-100 p-8 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-2">Real-time Feedback</h3>
                    <p className="text-gray-600">AI-powered form correction</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-2">100+ Challenges</h3>
                    <p className="text-gray-600">Daily workout challenges</p>
                </div>
                <div className="bg-gray-100 p-8 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                    <p className="text-gray-600">Monitor your fitness journey</p>
                </div>
            </div>
        </div>
    );
};

export default Home;