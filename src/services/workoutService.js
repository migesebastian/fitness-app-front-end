const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getWorkouts = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/workouts/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (err) {
    throw new Error(err.message);
  }
};

const addWorkout = async (userId, workoutData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/workouts/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(workoutData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (err) {
    throw new Error(err.message);
  }
};

const addExerciseToWorkout = async (workoutId, exerciseData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/workouts/${workoutId}/exercises`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(exerciseData),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (err) {
    throw new Error(err.message);
  }
};

export { getWorkouts, addWorkout, addExerciseToWorkout };
