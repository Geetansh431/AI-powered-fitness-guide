import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Exercise = () => {
    const [time, setTime] = useState(0);
    const webcamRef = useRef(null);
    // const { id } = useParams();
    const navigate = useNavigate();
    //timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    //timer formate
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };
    //pushing after ending
    const handleEnd = () =>{
        localStorage.setItem('exerciseTime', time);
        alert(`Exercise session ended. Total time: ${formatTime(time)}`);
        navigate('/challenges');
    }
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-8">
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden">
                <Webcam ref={webcamRef} mirrored={true} className="w-full h-full object-cover"/>
                <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-lg">
                    Time: {formatTime(time)}
                </div>
                <button onClick={handleEnd} className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg text-lg">
                    End
                </button>
            </div>
        </div>
    );
};

export default Exercise;