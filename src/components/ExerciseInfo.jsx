import React, { useState, useEffect } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import ExerciseHistoryGraph from './ExerciseInfo/ExerciseHistoryGraph';

const ExerciseInfo = () => {
  const { selectedExercise, updateExercise } = useWorkout();
  
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sets: 0,
    repType: 'count',
    reps: 0,
    videoUrl: '',
    variations: []
  });
  
  // New variation input
  const [newVariation, setNewVariation] = useState('');
  
  // Update form data when selected exercise changes
  useEffect(() => {
    if (selectedExercise) {
      setFormData({
        name: selectedExercise.name || '',
        category: selectedExercise.category || '',
        sets: selectedExercise.sets || 0,
        repType: selectedExercise.repType || 'count',
        reps: selectedExercise.reps || 0,
        videoUrl: selectedExercise.videoUrl || '',
        variations: [...(selectedExercise.variations || [])]
      });
    }
  }, [selectedExercise]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value, 10) : value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedExercise) {
      updateExercise({
        ...selectedExercise,
        ...formData
      });
      
      setEditMode(false);
    }
  };
  
  // Add a new variation
  const handleAddVariation = () => {
    if (newVariation.trim()) {
      setFormData(prev => ({
        ...prev,
        variations: [...prev.variations, newVariation.trim()]
      }));
      
      setNewVariation('');
    }
  };
  
  // Remove a variation
  const handleRemoveVariation = (index) => {
    setFormData(prev => ({
      ...prev,
      variations: prev.variations.filter((_, i) => i !== index)
    }));
  };
  
  // Render video or placeholder
  const renderVideo = () => {
    if (selectedExercise?.videoUrl) {
      if (selectedExercise.videoUrl.includes('youtube.com') || selectedExercise.videoUrl.includes('youtu.be')) {
        // Extract YouTube ID and embed
        const videoId = selectedExercise.videoUrl.split('v=')[1] || selectedExercise.videoUrl.split('/').pop();
        return (
          <iframe 
            className="w-full h-48 rounded-md"
            src={`https://www.youtube.com/embed/${videoId}`} 
            title={`${selectedExercise.name} video`}
            allowFullScreen
          ></iframe>
        );
      } else {
        // Regular video
        return (
          <video 
            className="w-full h-48 rounded-md"
            src={selectedExercise.videoUrl}
            controls
          ></video>
        );
      }
    }
    
    // Placeholder
    return (
      <div className="w-full h-48 bg-gray-800 rounded-md flex items-center justify-center">
        <p className="text-gray-500">No video available</p>
      </div>
    );
  };

  if (!selectedExercise) {
    return (
      <div className="exercise-info bg-darkgray rounded-lg p-4 text-center">
        <h2 className="text-lg font-display font-bold mb-3 text-secondary">Exercise Details</h2>
        <p className="text-gray-400 py-10">Select an exercise to view details</p>
      </div>
    );
  }

  return (
    <div className="exercise-info">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-display font-bold text-secondary">Exercise Details</h2>
        <button 
          className="btn-secondary text-xs py-1 px-3"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Cancel' : 'Edit'}
        </button>
      </div>
      
      <div className="bg-darkgray rounded-lg p-4">
        {editMode ? (
          // Edit form
          <form onSubmit={handleSubmit} className="exercise-edit-form">
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-gray-900 text-white p-2 rounded-md"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                name="category"
                className="w-full bg-gray-900 text-white p-2 rounded-md"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="Upper Body">Upper Body</option>
                <option value="Lower Body">Lower Body</option>
                <option value="Core">Core</option>
                <option value="Cardio">Cardio</option>
                <option value="Full Body">Full Body</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Sets</label>
                <input
                  type="number"
                  name="sets"
                  className="w-full bg-gray-900 text-white p-2 rounded-md"
                  value={formData.sets}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Rep Type</label>
                <select
                  name="repType"
                  className="w-full bg-gray-900 text-white p-2 rounded-md"
                  value={formData.repType}
                  onChange={handleChange}
                >
                  <option value="count">Count</option>
                  <option value="time">Time (seconds)</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">
                {formData.repType === 'count' ? 'Reps' : 'Time (seconds)'}
              </label>
              <input
                type="number"
                name="reps"
                className="w-full bg-gray-900 text-white p-2 rounded-md"
                value={formData.reps}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Video URL</label>
              <input
                type="url"
                name="videoUrl"
                className="w-full bg-gray-900 text-white p-2 rounded-md"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://example.com/video.mp4"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Variations</label>
              <div className="flex space-x-2 mb-2">
                <input
                  type="text"
                  className="flex-1 bg-gray-900 text-white p-2 rounded-md"
                  value={newVariation}
                  onChange={(e) => setNewVariation(e.target.value)}
                  placeholder="New variation"
                />
                <button
                  type="button"
                  className="btn-primary py-1 px-3"
                  onClick={handleAddVariation}
                >
                  Add
                </button>
              </div>
              
              <ul className="variations-list">
                {formData.variations.map((variation, index) => (
                  <li 
                    key={index}
                    className="flex justify-between items-center bg-gray-800 p-2 rounded-md mb-1"
                  >
                    <span>{variation}</span>
                    <button
                      type="button"
                      className="text-xs bg-red-700 hover:bg-red-600 p-1 rounded"
                      onClick={() => handleRemoveVariation(index)}
                    >
                      ✖️
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="btn-primary py-2 px-4"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          // Display exercise details
          <div className="exercise-details">
            <h3 className="text-xl font-bold mb-4">{selectedExercise.name}</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400">Category</p>
                <p className="font-medium">{selectedExercise.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Sets & Reps</p>
                <p className="font-medium">
                  {selectedExercise.sets} sets × {selectedExercise.reps} {selectedExercise.repType === 'time' ? 'sec' : 'reps'}
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-2">Example Video</p>
              {renderVideo()}
            </div>
            
            {selectedExercise.variations && selectedExercise.variations.length > 0 && (
              <div>
                <p className="text-sm text-gray-400 mb-2">Variations</p>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.variations.map((variation, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 px-2 py-1 rounded-full text-xs"
                    >
                      {variation}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Exercise History Graph */}
      {!editMode && selectedExercise && (
        <div className="mt-6">
          <h3 className="text-sm font-display font-bold mb-2 text-secondary">Exercise Progress</h3>
          <div className="bg-darkgray rounded-lg p-4">
            <ExerciseHistoryGraph exerciseId={selectedExercise.id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseInfo;