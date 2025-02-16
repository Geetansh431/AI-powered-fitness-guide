import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown"; // For pretty response formatting
import { Dumbbell, Brain, History, Bookmark, AlertCircle, ChevronRight, Check } from "lucide-react";

const PersonalizedTraining = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [savedQueries, setSavedQueries] = useState([]);
    const [queryHistory, setQueryHistory] = useState([]);
    const [activeTab, setActiveTab] = useState("ask");
    const [characterCount, setCharacterCount] = useState(0);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState(null); // For viewing full history chats
    const [isSaved, setIsSaved] = useState(false); // Track if the current response is saved

    const API_KEY = "AIzaSyAskR1GqZzlZXYfZO4kmFt37PN9zAAvyPs"; // Replace with your actual API key

    // Load saved queries and history from localStorage on component mount
    useEffect(() => {
        const saved = localStorage.getItem("savedQueries");
        const history = localStorage.getItem("queryHistory");
        if (saved) setSavedQueries(JSON.parse(saved));
        if (history) setQueryHistory(JSON.parse(history));
    }, []);

    // Save queries and history to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("savedQueries", JSON.stringify(savedQueries));
    }, [savedQueries]);

    useEffect(() => {
        localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
    }, [queryHistory]);

    const handleAskAI = async () => {
        if (!query.trim()) {
            setError("Please enter a valid query.");
            return;
        }

        setIsLoading(true);
        setError("");
        setIsSaved(false); // Reset saved state for new queries

        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

        const requestData = {
            contents: [{
                parts: [{
                    text: `You are a fitness expert. Provide a detailed, structured response to this fitness question: ${query}. Include specific recommendations, science-based explanations, and safety considerations where applicable.`,
                }],
            }],
        };

        try {
            const res = await axios.post(url, requestData, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.data && res.data.candidates && res.data.candidates[0].content.parts[0].text) {
                const aiResponse = res.data.candidates[0].content.parts[0].text;
                setResponse(aiResponse);

                // Add to query history
                const newHistory = [...queryHistory, { query, response: aiResponse, timestamp: new Date().toISOString() }];
                setQueryHistory(newHistory);
            } else {
                setError("Unexpected response format from AI.");
            }
        } catch (error) {
            console.error(error);
            setError("Failed to fetch response. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const saveQuery = () => {
        if (query && response) {
            const newSavedQueries = [...savedQueries, { query, response, timestamp: new Date().toISOString() }];
            setSavedQueries(newSavedQueries);
            setIsSaved(true); // Mark as saved
        }
    };

    const handleQueryChange = (e) => {
        const text = e.target.value;
        setQuery(text);
        setCharacterCount(text.length);
    };

    const renderHistoryItem = (item) => {
        return (
            <div
                key={item.timestamp}
                className="bg-zinc-800/50 p-4 rounded-lg cursor-pointer hover:bg-zinc-700/50 transition-colors"
                onClick={() => setSelectedHistoryItem(item)}
            >
                <div className="flex justify-between items-center">
                    <p className="text-gray-300 font-medium">{item.query}</p>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-gray-400 text-sm mt-2">{new Date(item.timestamp).toLocaleDateString()}</p>
            </div>
        );
    };

    const renderTab = () => {
        switch (activeTab) {
            case "history":
                return (
                    <div className="space-y-4">
                        {queryHistory.map((item) => renderHistoryItem(item))}
                    </div>
                );
            case "saved":
                return (
                    <div className="space-y-4">
                        {savedQueries.map((item) => renderHistoryItem(item))}
                    </div>
                );
            default:
                return (
                    <>
                        <div className="mb-8">
                            <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Brain className="w-6 h-6 text-purple-400" />
                                    <h2 className="text-xl font-semibold text-gray-200">Ask Your Question</h2>
                                </div>
                                <textarea
                                    className="w-full p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 min-h-[120px]"
                                    placeholder="Example: Design a HIIT workout for fat burning? What's the optimal protein intake for muscle growth? How can I improve my deadlift form?"
                                    value={query}
                                    onChange={handleQueryChange}
                                    maxLength={500}
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-gray-400">{characterCount}/500 characters</span>
                                    <button
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:opacity-90 transition-all duration-200 flex items-center gap-2"
                                        onClick={handleAskAI}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                                                Processing...
                                            </div>
                                        ) : (
                                            <>
                                                <Dumbbell className="w-5 h-5" />
                                                Get Expert Advice
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-4 bg-red-950/50 border border-red-900/50 rounded-lg text-red-400 flex items-center gap-3"
                            >
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </motion.div>
                        )}

                        {response && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                            <Dumbbell className="w-6 h-6 text-white" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-200">Expert Response</h2>
                                    </div>
                                    <button
                                        onClick={saveQuery}
                                        disabled={isSaved} // Disable button if already saved
                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                                    >
                                        {isSaved ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-400" />
                                                Saved
                                            </>
                                        ) : (
                                            <>
                                                <Bookmark className="w-4 h-4" />
                                                Save
                                            </>
                                        )}
                                    </button>
                                </div>
                                
                                <div className="prose prose-invert max-w-none">
                                    <ReactMarkdown className="text-gray-300 leading-relaxed space-y-4 px-4">
                                        {response}
                                    </ReactMarkdown>
                                </div>
                                
                                <div className="mt-6 pt-6 border-t border-zinc-800/50">
                                    <p className="text-sm text-gray-400 italic">
                                        Note: This advice is generated by AI based on general fitness principles. Always consult with a healthcare professional before starting any new fitness program.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white p-6">
            <div className="max-w-3xl mx-auto pt-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                        AI Fitness Trainer
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Your personal AI-powered fitness expert. Get customized workout plans, nutrition advice, and expert guidance for your fitness journey.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => {
                            setActiveTab("ask");
                            setSelectedHistoryItem(null); // Reset selected history item
                        }}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                            activeTab === "ask" 
                                ? "bg-purple-500 text-white" 
                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                        }`}
                    >
                        <Brain className="w-4 h-4" />
                        Ask AI
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("history");
                            setSelectedHistoryItem(null); // Reset selected history item
                        }}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                            activeTab === "history" 
                                ? "bg-purple-500 text-white" 
                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                        }`}
                    >
                        <History className="w-4 h-4" />
                        History
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab("saved");
                            setSelectedHistoryItem(null); // Reset selected history item
                        }}
                        className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                            activeTab === "saved" 
                                ? "bg-purple-500 text-white" 
                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                        }`}
                    >
                        <Bookmark className="w-4 h-4" />
                        Saved
                    </button>
                </div>

                {selectedHistoryItem ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800/50 backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                    <Dumbbell className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-200">Expert Response</h2>
                            </div>
                            <button
                                onClick={() => setSelectedHistoryItem(null)}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                            >
                                Back
                            </button>
                        </div>
                        
                        <div className="prose prose-invert max-w-none">
                            <ReactMarkdown className="text-gray-300 leading-relaxed space-y-4 px-4">
                                {selectedHistoryItem.response}
                            </ReactMarkdown>
                        </div>
                    </motion.div>
                ) : (
                    renderTab()
                )}
            </div>
        </div>
    );
};

export default PersonalizedTraining;