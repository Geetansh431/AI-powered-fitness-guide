import React, { useState } from 'react';
import { Play, Timer, Flame, Heart, Users, Star, Zap, ChevronRight, Crown, Calendar, Award, ArrowLeft } from 'lucide-react';

const WorkoutComponent = ({ workoutData, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  if (!workoutData) {
    return <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white flex items-center justify-center">No workout data provided</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors text-zinc-300 hover:text-white"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20" />
          <div className="relative space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 rounded-full text-sm bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center gap-2">
                <Crown className="w-4 h-4" /> Premium
              </span>
              <span className="px-4 py-1.5 rounded-full text-sm bg-orange-500/20 border border-orange-400/30 text-orange-300 flex items-center gap-2">
                <Zap className="w-4 h-4" /> {workoutData.type}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                {workoutData.name}
              </span>
            </h1>
            <p className="text-zinc-300 text-xl max-w-2xl leading-relaxed">
              {workoutData.description}
            </p>
          </div>
        </div>

        <div className="flex gap-4 p-1 bg-zinc-900/50 backdrop-blur-lg rounded-xl w-fit">
          {['overview', 'tutorial'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-lg font-medium capitalize transition-all duration-300 ${activeTab === tab
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {activeTab === 'overview' && (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Timer, color: 'text-blue-400', bgColor: 'bg-blue-400/10', title: 'Duration', value: workoutData.duration, desc: 'Optimal workout length' },
                  { icon: Flame, color: 'text-orange-400', bgColor: 'bg-orange-400/10', title: 'Calories', value: workoutData.calories, desc: 'Average burn rate' },
                  { icon: Heart, color: 'text-red-400', bgColor: 'bg-red-400/10', title: 'Intensity', value: workoutData.intensity, desc: 'Advanced level workout' }
                ].map((stat, index) => (
                  <div key={index} className="group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-xl rounded-2xl" />
                    <div className="relative p-6 h-full">
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <h3 className="text-lg font-medium text-zinc-300 mb-2">{stat.title}</h3>
                      <div className="text-4xl font-bold mb-2">{stat.value}</div>
                      <p className="text-zinc-400">{stat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-xl rounded-2xl" />
                  <div className="relative p-6 space-y-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <Award className="w-6 h-6 text-purple-400" />
                      Workout Benefits
                    </h3>
                    <div className="space-y-5">
                      {[
                        { text: "Improved cardiovascular endurance", progress: 90 },
                        { text: "Enhanced fat burning potential", progress: 85 },
                        { text: "Better stamina and energy levels", progress: 80 },
                        { text: "Increased metabolic rate", progress: 75 }
                      ].map((benefit, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-zinc-200">{benefit.text}</span>
                            <span className="text-purple-400 font-medium">{benefit.progress}%</span>
                          </div>
                          <div className="h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 group-hover:from-purple-500 group-hover:to-pink-500"
                              style={{ width: `${benefit.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-xl rounded-2xl" />
                  <div className="relative p-6">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                      <Users className="w-6 h-6 text-purple-400" />
                      Trainer Profile
                    </h3>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 p-0.5">
                        <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center">
                          <Users className="w-10 h-10 text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold mb-1">
                          {workoutData.trainer.name}
                        </h4>
                        <p className="text-zinc-400">{workoutData.trainer.specialty} • {workoutData.trainer.experience}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 rounded-xl text-sm bg-zinc-800/50 backdrop-blur-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" /> 1000+ sessions
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'tutorial' && (
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-xl rounded-2xl" />
              <div className="relative p-6 space-y-6">
                <h3 className="text-2xl font-bold">Workout Tutorial</h3>
                {!isVideoPlaying ? (
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-full py-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/20"
                  >
                    <Play className="w-8 h-8" /> Start Your Workout
                  </button>
                ) : (
                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${workoutData.videoId}?autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutComponent;