import { useContext, useState, useEffect } from 'react';
import { AuthedUserContext } from '../../App';
import * as workoutService from '../../services/workoutService';
import './workouts.css';

const Workouts = () => {
  const user = useContext(AuthedUserContext);
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [newExercise, setNewExercise] = useState({ name: '', sets: '', reps: '', weight: '' });

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutsData = await workoutService.getWorkouts(user._id);
        setWorkouts(workoutsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkouts();
  }, [user]);

  const handleAddWorkout = async () => {
    try {
      const workoutData = { name: newWorkout, exercises: [] };
      const workout = await workoutService.addWorkout(user._id, workoutData);
      setWorkouts([...workouts, workout]);
      setNewWorkout('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddExercise = async () => {
    try {
      const exerciseData = {
        name: newExercise.name,
        sets: newExercise.sets,
        reps: newExercise.reps,
        weight: newExercise.weight
      };
      const workout = await workoutService.addExerciseToWorkout(selectedWorkout, exerciseData);
      setWorkouts(workouts.map(w => w._id === workout._id ? workout : w));
      setNewExercise({ name: '', sets: '', reps: '', weight: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <h1>{user.username}'s Workouts</h1>
      <div>
        <input
          type="text"
          value={newWorkout}
          onChange={(e) => setNewWorkout(e.target.value)}
          placeholder="New workout name"
        />
        <button onClick={handleAddWorkout}>Add Workout</button>
      </div>
      {workouts.map(workout => (
        <div key={workout._id}>
          <h2 onClick={() => setSelectedWorkout(workout._id)}>{workout.name}</h2>
          <ul>
            {workout.exercises.map((exercise, index) => (
              <li key={index}>
                {exercise.name} - {exercise.sets} sets of {exercise.reps} reps at {exercise.weight}kg
              </li>
            ))}
          </ul>
          {selectedWorkout === workout._id && (
            <div>
              <input
                type="text"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                placeholder="Exercise name"
              />
              <input
                type="number"
                value={newExercise.sets}
                onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                placeholder="Sets"
              />
              <input
                type="number"
                value={newExercise.reps}
                onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                placeholder="Reps"
              />
              <input
                type="number"
                value={newExercise.weight}
                onChange={(e) => setNewExercise({ ...newExercise, weight: e.target.value })}
                placeholder="Weight"
              />
              <button onClick={handleAddExercise}>Add Exercise</button>
            </div>
          )}
        </div>
      ))}
    </main>
  );
};

export default Workouts;
