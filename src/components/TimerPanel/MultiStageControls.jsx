import React, { useState } from 'react';
import { useTimer } from '../../context/TimerContext';
import { formatTime, parseTime } from '../../utils/timerUtils';

const MultiStageControls = () => {
  const { 
    stages, 
    addStage, 
    updateStage, 
    removeStage, 
    reorderStages,
    currentStageIndex,
    isRunning
  } = useTimer();

  const [editingStage, setEditingStage] = useState(null);
  const [stageInputs, setStageInputs] = useState({ name: '', duration: '' });

  // Handle adding a new stage
  const handleAddStage = () => {
    const newStage = addStage('New Stage', 60);
    setEditingStage(newStage.id);
    setStageInputs({ name: newStage.name, duration: formatTime(newStage.duration) });
  };

  // Handle editing a stage
  const handleEditStage = (stage) => {
    setEditingStage(stage.id);
    setStageInputs({
      name: stage.name,
      duration: formatTime(stage.duration)
    });
  };

  // Handle saving stage edits
  const handleSaveStage = (id) => {
    // Parse the duration input (MM:SS format)
    let duration = 0;
    try {
      duration = parseTime(stageInputs.duration);
    } catch (e) {
      // If parsing fails, use 60 seconds as default
      duration = 60;
    }

    updateStage(id, {
      name: stageInputs.name || 'Unnamed Stage',
      duration
    });

    setEditingStage(null);
  };

  // Handle removing a stage
  const handleRemoveStage = (id) => {
    if (window.confirm('Are you sure you want to remove this stage?')) {
      removeStage(id);
      setEditingStage(null);
    }
  };

  // Handle stage input changes
  const handleInputChange = (field, value) => {
    setStageInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle moving a stage up in the order
  const handleMoveUp = (index) => {
    if (index > 0) {
      reorderStages(index, index - 1);
    }
  };

  // Handle moving a stage down in the order
  const handleMoveDown = (index) => {
    if (index < stages.length - 1) {
      reorderStages(index, index + 1);
    }
  };

  return (
    <div className="multi-stage-controls">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">Timer Stages</h3>
        <button
          className="btn-primary text-xs py-1 px-3"
          onClick={handleAddStage}
          disabled={isRunning}
          aria-label="Add Stage"
        >
          + Add Stage
        </button>
      </div>
      
      <div className="stage-list rounded-md overflow-hidden">
        {stages.length === 0 ? (
          <div className="bg-gray-800 p-3 text-center text-sm text-gray-400">
            No stages defined. Add a stage to begin.
          </div>
        ) : (
          stages.map((stage, index) => (
            <div 
              key={stage.id}
              className={`stage-row p-3 ${
                index === currentStageIndex 
                  ? 'bg-primary bg-opacity-20 border-l-4 border-primary' 
                  : index % 2 === 0 
                    ? 'bg-gray-800' 
                    : 'bg-gray-700'
              }`}
            >
              {editingStage === stage.id ? (
                // Editing mode
                <div className="editing-controls">
                  <div className="flex space-x-3 mb-2">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-400 mb-1">Name</label>
                      <input 
                        type="text"
                        className="bg-gray-900 text-white p-2 w-full rounded-md"
                        value={stageInputs.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Stage Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Duration (MM:SS)</label>
                      <input 
                        type="text"
                        className="bg-gray-900 text-white p-2 w-full rounded-md"
                        value={stageInputs.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="00:00"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button
                      className="btn bg-gray-600 hover:bg-gray-500 text-xs py-1 px-3"
                      onClick={() => setEditingStage(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary text-xs py-1 px-3"
                      onClick={() => handleSaveStage(stage.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                // Display mode
                <div className="flex justify-between items-center">
                  <div className="stage-info flex-1">
                    <div className="font-medium">{stage.name}</div>
                    <div className="text-xs text-gray-400">
                      Duration: {formatTime(stage.duration)}
                    </div>
                  </div>
                  <div className="stage-actions flex space-x-1">
                    <button
                      className="action-btn bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0 || isRunning}
                      aria-label="Move Stage Up"
                    >
                      ↑
                    </button>
                    <button
                      className="action-btn bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
                      onClick={() => handleMoveDown(index)}
                      disabled={index === stages.length - 1 || isRunning}
                      aria-label="Move Stage Down"
                    >
                      ↓
                    </button>
                    <button
                      className="action-btn bg-gray-700 hover:bg-gray-600"
                      onClick={() => handleEditStage(stage)}
                      disabled={isRunning}
                      aria-label="Edit Stage"
                    >
                      ✏️
                    </button>
                    <button
                      className="action-btn bg-red-700 hover:bg-red-600"
                      onClick={() => handleRemoveStage(stage.id)}
                      disabled={isRunning}
                      aria-label="Remove Stage"
                    >
                      ✖️
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MultiStageControls;