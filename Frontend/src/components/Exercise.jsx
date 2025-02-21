import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Exercise = () => {
    const [time, setTime] = useState(0);
    const [isStreaming, setIsStreaming] = useState(true);
    const [exerciseData, setExerciseData] = useState({
        pushup_count: 0,
        squat_count: 0,
        crunch_count: 0
    });

    const navigate = useNavigate();
    const videoStreamURL = "http://127.0.0.1:8080";
    const exerciseDataURL = "http://127.0.0.1:8080/exercise-data"; 

    useEffect(() => {
        // Timer for tracking exercise duration
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Fetch exercise count data every 2 seconds
        const fetchExerciseData = async () => {
            try {
                const response = await fetch(exerciseDataURL);
                const data = await response.json();
                setExerciseData(data);
            } catch (error) {
                console.error("Error fetching exercise data:", error);
            }
        };

        const interval = setInterval(fetchExerciseData, 2000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handleEnd = () => {
        localStorage.setItem("exerciseTime", time);
        alert(`Exercise session ended. Total time: ${formatTime(time)}`);
        navigate("/challenges");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
                {isStreaming ? (
                    <img
                        src={videoStreamURL}
                        alt="Exercise Stream"
                        className="w-full h-full object-cover"
                        onError={() => setIsStreaming(false)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white text-xl">
                        Unable to load video stream. Please check your connection.
                    </div>
                )}

                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white text-2xl font-bold">Exercise Detection</h1>
                        <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-lg">
                            Time: {formatTime(time)}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleEnd}
                    className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                    End Session
                </button>
            </div>

            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800">Exercise Count</h2>
                <p className="text-lg text-gray-700">Push-ups: {exerciseData.pushup_count}</p>
                <p className="text-lg text-gray-700">Squats: {exerciseData.squat_count}</p>
                <p className="text-lg text-gray-700">Crunches: {exerciseData.crunch_count}</p>
            </div>
        </div>
    );
};

export default Exercise;
