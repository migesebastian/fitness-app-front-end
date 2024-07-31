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

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [workouts, setWorkouts] = useState([]);

  // Function to handle user signout
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  // Function to handle profile updates
  const handleUpdateProfile = (updatedProfileData) => {
    if (user) {
      // Note: implement the logic to update the user data on the server
      setUser(prevState => ({
        ...prevState,
        ...updatedProfileData,
        profilePicture: updatedProfileData.profilePicture
          ? URL.createObjectURL(updatedProfileData.profilePicture)
          : prevState.profilePicture,
      }));
    }
  };

  // Function to handle adding new workouts
  const handleAddWorkout = (newWorkout) => {
    setWorkouts([...workouts, newWorkout]);
  };

  // Function to handle updating existing workouts
  const handleUpdateWorkout = (updatedWorkout, workoutId) => {
    setWorkouts(workouts.map(workout => workout._id === workoutId ? updatedWorkout : workout));
  };

  // Load workouts from an API or local storage when the app starts
  useEffect(() => {
    // Fetch workouts here if needed
  }, []);

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
