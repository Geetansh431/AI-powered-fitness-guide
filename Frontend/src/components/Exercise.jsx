import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Exercise = () => {
    const [time, setTime] = useState(0);
    const navigate = useNavigate();
    const videoStreamURL = "http://127.0.0.1:8080/"; // Flask API URL

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(timer);
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
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
                {/* Use Flask Video Stream */}
                <img src={videoStreamURL} alt="Exercise Stream" className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-lg">
                    Time: {formatTime(time)}
                </div>
                <button
                    onClick={handleEnd}
                    className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-lg"
                >
                    End
                </button>
            </div>
        </div>
    );
};

export default Exercise;
