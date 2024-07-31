import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from './services/authService';
import Profile from './components/Profile/Profile';
import Workouts from './components/Workouts/Workouts';
import Meals from './components/Meals/Meals';
import * as workoutService from './services/workoutService';
import * as mealService from './services/mealService';
import * as profileService from './services/profileService';


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [workouts, setWorkouts] = useState([]);
  const [meals, setMeals] = useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleUpdateProfile = async (updatedProfileData) => {
    if (user) {
      const updatedUser = await profileService.updateProfile(updatedProfileData);
      setUser(updatedUser);
    }
  };

  const handleAddWorkout = async (newWorkout) => {
    const addedWorkout = await workoutService.create(newWorkout);
    setWorkouts([...workouts, addedWorkout]);
  };

  const handleUpdateWorkout = async (updatedWorkout, workoutId) => {
    const updatedWorkoutFromServer = await workoutService.update(workoutId, updatedWorkout);
    setWorkouts(workouts.map((workout) => (workout._id === workoutId ? updatedWorkoutFromServer : workout)));
  };

  const handleDeleteWorkout = async (workoutId) => {
    await workoutService.deleteWorkout(workoutId);
    setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
  };

  const handleAddMeal = async (newMeal) => {
    const addedMeal = await mealService.create(newMeal);
    setMeals([...meals, addedMeal]);
  };

  const handleUpdateMeal = async (updatedMeal, mealId) => {
    const updatedMealFromServer = await mealService.update(mealId, updatedMeal);
    setMeals(meals.map((meal) => (meal._id === mealId ? updatedMealFromServer : meal)));
  };

  const handleDeleteMeal = async (mealId) => {
    await mealService.deleteMeal(mealId);
    setMeals(meals.filter((meal) => meal._id !== mealId));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const fetchedWorkouts = await workoutService.index();
        const fetchedMeals = await mealService.index();
        setWorkouts(fetchedWorkouts);
        setMeals(fetchedMeals);
      }
    };
    fetchData();
  }, [user]);

  return (
    <AuthedUserContext.Provider value={user}>
      <NavBar handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route
              path="/profile"
              element={<Profile user={user} handleUpdateProfile={handleUpdateProfile} />}
            />
            <Route
              path="/workouts"
              element={
                <Workouts
                  workouts={workouts}
                  handleAddWorkout={handleAddWorkout}
                  handleUpdateWorkout={handleUpdateWorkout}
                  handleDeleteWorkout={handleDeleteWorkout}
                />
              }
            />
            <Route
              path="/meals"
              element={
                <Meals
                  meals={meals}
                  handleAddMeal={handleAddMeal}
                  handleUpdateMeal={handleUpdateMeal}
                  handleDeleteMeal={handleDeleteMeal}
                />
              }
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </>
        )}
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;