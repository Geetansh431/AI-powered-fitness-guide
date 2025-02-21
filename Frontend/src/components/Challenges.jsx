import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Hash, ChevronRight, Dumbbell, Filter, Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChallengesStore } from '../Store/useChallengesStore';

const Challenges = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [selectedTypes, setSelectedTypes] = useState(new Set());
    const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(new Set());
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const {exercises} = useChallengesStore();
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const uniqueTypes = [...new Set(exercises.map(ex => ex.type))];
    const uniqueMuscleGroups = [...new Set(exercises.map(ex => ex.muscleGroup))];

    useEffect(() => {
        const filtered = exercises.filter(exercise => {
            const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesType = selectedTypes.size === 0 || selectedTypes.has(exercise.type);
            const matchesMuscle = selectedMuscleGroups.size === 0 || selectedMuscleGroups.has(exercise.muscleGroup);
            return matchesSearch && matchesType && matchesMuscle;
        });
        setFilteredExercises(filtered);
    }, [searchQuery, selectedTypes, selectedMuscleGroups]);

    const toggleType = (type) => {
        const newTypes = new Set(selectedTypes);
        if (newTypes.has(type)) {
            newTypes.delete(type);
        } else {
            newTypes.add(type);
        }
        setSelectedTypes(newTypes);
    };

    const toggleMuscleGroup = (group) => {
        const newGroups = new Set(selectedMuscleGroups);
        if (newGroups.has(group)) {
            newGroups.delete(group);
        } else {
            newGroups.add(group);
        }
        setSelectedMuscleGroups(newGroups);
    };

    const clearFilters = () => {
        setSelectedTypes(new Set());
        setSelectedMuscleGroups(new Set());
        setSearchQuery('');
    };

    const { t } = useTranslation();
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 text-white py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <h1 className="text-6xl font-bold mb-6 pt-8 pb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 tracking-tight">
                        {t("Daily Challenges")}
                    </h1>
                    
                    <div className="max-w-2xl mx-auto mt-8">
                        <div className="relative flex items-center mb-6">
                            <Search className="absolute left-4 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search exercises..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <button 
                                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                                    isFilterMenuOpen 
                                        ? 'bg-purple-600 text-white' 
                                        : 'bg-gray-800/50 hover:bg-gray-700'
                                }`}
                            >
                                <Filter size={20} />
                                <span>Filters</span>
                            </button>

                            {(selectedTypes.size > 0 || selectedMuscleGroups.size > 0) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>

                        {isFilterMenuOpen && (
                            <div className="mt-4 p-6 bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl">
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3">Exercise Type</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueTypes.map(type => (
                                            <button
                                                key={type}
                                                onClick={() => toggleType(type)}
                                                className={`px-4 py-2 rounded-full text-sm transition-all
                                                    ${selectedTypes.has(type)
                                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                            >
                                                {type.charAt(0).toUpperCase() + type.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Muscle Group</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {uniqueMuscleGroups.map(group => (
                                            <button
                                                key={group}
                                                onClick={() => toggleMuscleGroup(group)}
                                                className={`px-4 py-2 rounded-full text-sm transition-all
                                                    ${selectedMuscleGroups.has(group)
                                                        ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/20'
                                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                                            >
                                                {group.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {filteredExercises.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">No exercises found matching your criteria</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredExercises.map((exercise) => (
                            <div
                                key={exercise.id}
                                className="relative group"
                                onMouseEnter={() => setHoveredCard(exercise.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-3xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h3 className="text-2xl font-bold mb-2">{exercise.name}</h3>
                                            <p className="text-gray-400">{exercise.description}</p>
                                        </div>
                                        <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                                            {exercise.type}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        {exercise.durations.map((duration) => (
                                            <Link
                                                to={`/exercise/${exercise.id}/${duration.difficulty}?duration=${duration.minutes}`}
                                                key={`${exercise.id}-${duration.minutes}`}
                                                className="block"
                                            >
                                                <div className={`p-4 rounded-xl transition-all duration-300
                                                    ${hoveredCard === exercise.id 
                                                        ? 'bg-gray-700 hover:bg-purple-700' 
                                                        : 'bg-gray-700/50 hover:bg-gray-700'}`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <Clock size={16} className="text-purple-400" />
                                                            <span className="font-medium">{duration.minutes} mins</span>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium
                                                            ${duration.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                                                              duration.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                                                              'bg-red-500/20 text-red-400'}`}>
                                                            {duration.difficulty}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Hash size={16} className="text-orange-400" />
                                                            <span className="text-gray-300">{duration.calories} reps</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-purple-400 group-hover:translate-x-1 transition-transform">
                                                            <span>Start</span>
                                                            <ChevronRight size={16} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="absolute -top-2 -right-2 bg-purple-600 p-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                                        <Dumbbell size={20} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Challenges;