import { useState } from 'react';

const Workouts = ({ workouts, handleAddWorkout, handleUpdateWorkout }) => {
  const [formData, setFormData] = useState({
    date: '',
    exercises: [{ name: '', weight: '', sets: '', reps: '' }]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  // Simplified handleChange function
  const handleChange = (evt) => {
    const { name, value, dataset } = evt.target;
    if (name === 'date') {
      setFormData({ ...formData, date: value });
    } else if (dataset.index !== undefined) {
      const index = dataset.index;
      const updatedExercises = [...formData.exercises];
      updatedExercises[index] = { ...updatedExercises[index], [name]: value };
      setFormData({ ...formData, exercises: updatedExercises });
    }
  };

  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: '', weight: '', sets: '', reps: '' }]
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (selectedWorkout) {
      handleUpdateWorkout(formData, selectedWorkout._id);
    } else {
      handleAddWorkout(formData);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: '',
      exercises: [{ name: '', weight: '', sets: '', reps: '' }]
    });
    setSelectedWorkout(null);
    setIsEditing(false);
  };

  const startEditing = (workout) => {
    setFormData({
      date: workout.date,
      exercises: workout.exercises
    });
    setSelectedWorkout(workout);
    setIsEditing(true);
  };

  return (
    <main>
      {!isEditing ? (
        <div>
          <h1>Workouts</h1>
          <ul>
            {workouts.map((workout) => (
              <li key={workout._id}>
                <p><strong>Date:</strong> {workout.date}</p>
                <div>
                  {workout.exercises.map((exercise, index) => (
                    <div key={index}>
                      <p><strong>Exercise Name:</strong> {exercise.name}</p>
                      <p><strong>Weight:</strong> {exercise.weight} lbs</p>
                      <p><strong>Sets:</strong> {exercise.sets}</p>
                      <p><strong>Reps:</strong> {exercise.reps}</p>
                    </div>
                  ))}
                </div>
                <button onClick={() => startEditing(workout)}>Edit Workout</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)}>Add New Workout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>{selectedWorkout ? 'Edit Workout' : 'Log Workout'}</h1>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {formData.exercises.map((exercise, index) => (
            <div key={index}>
              <label htmlFor={`name-${index}`}>Exercise Name</label>
              <input
                type="text"
                name="name"
                id={`name-${index}`}
                value={exercise.name}
                data-index={index}
                onChange={handleChange}
                required
              />
              <label htmlFor={`weight-${index}`}>Weight (lbs)</label>
              <input
                type="number"
                name="weight"
                id={`weight-${index}`}
                value={exercise.weight}
                data-index={index}
                onChange={handleChange}
                required
              />
              <label htmlFor={`sets-${index}`}>Sets</label>
              <input
                type="number"
                name="sets"
                id={`sets-${index}`}
                value={exercise.sets}
                data-index={index}
                onChange={handleChange}
                required
              />
              <label htmlFor={`reps-${index}`}>Reps</label>
              <input
                type="number"
                name="reps"
                id={`reps-${index}`}
                value={exercise.reps}
                data-index={index}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addExercise}>Add Exercise</button>
          <button type="submit">{selectedWorkout ? 'Update Workout' : 'Log Workout'}</button>
          <button type="button" onClick={resetForm}>Cancel</button>
        </form>
      )}
    </main>
  );
};

export default Workouts;
