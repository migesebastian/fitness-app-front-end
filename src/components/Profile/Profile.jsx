import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, handleUpdateProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    fitnessGoal: '',
    profilePicture: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        fitnessGoal: user.fitnessGoal || '',
        profilePicture: user.profilePicture || null,
      });
    }
  }, [user]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = (evt) => {
    setFormData({ ...formData, profilePicture: evt.target.files[0] });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateProfile(formData);
    setIsEditing(false);
    navigate('/profile'); // Navigate back to the profile page after update
  };

  return (
    <main>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="fitnessGoal">Fitness Goal</label>
          <input
            id="fitnessGoal"
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
          />
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            id="profilePicture"
            name="profilePicture"
            type="file"
            onChange={handleFileChange}
          />
          <button type="submit">Update Profile</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <h1>Profile</h1>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Fitness Goal:</strong> {formData.fitnessGoal}</p>
          {formData.profilePicture && (
            <div>
              <img
                src={URL.createObjectURL(formData.profilePicture)}
                alt="Profile"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </main>
  );
};

export default Profile;
