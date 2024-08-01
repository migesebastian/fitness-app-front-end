import { useContext, useState, useEffect } from 'react';
import { AuthedUserContext } from '../../App';
import * as profileService from '../../services/profileService';
// import './Profile.css';

const Profile = () => {
  const user = useContext(AuthedUserContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ profilePicture: '', fitnessGoals: '' });
  const [progressPictures, setProgressPictures] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.show(user._id);
        setProfile(profileData);
        setEditData({ profilePicture: profileData.profilePicture, fitnessGoals: profileData.fitnessGoals.join(', ') });
        const picturesData = await profileService.index(user._id);
        setProgressPictures(picturesData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = {
        ...profile,
        profilePicture: editData.profilePicture,
        fitnessGoals: editData.fitnessGoals.split(',').map(goal => goal.trim())
      };
      await profileService.update(user._id, updatedProfile);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePictureUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('picture', e.target.picture.files[0]);
    try {
      const newPicture = await profileService.uploadProgressPicture(formData);
      setProgressPictures([...progressPictures, newPicture]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <body2>
    <main>
      <h1>{user.username}'s Profile</h1>
      {profile ? (
        <div>
          {!isEditing ? (
            <>
              <p>Profile Picture: {profile.profilePicture || 'No picture available'}</p>
              <p>Fitness Goals: {profile.fitnessGoals ? profile.fitnessGoals.join(', ') : 'No goals set'}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="profilePicture">Profile Picture URL:</label>
                <input
                  type="text"
                  id="profilePicture"
                  name="profilePicture"
                  value={editData.profilePicture}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="fitnessGoals">Fitness Goals (comma separated):</label>
                <input
                  type="text"
                  id="fitnessGoals"
                  name="fitnessGoals"
                  value={editData.fitnessGoals}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          )}
          <h2>Progress Pictures</h2>
          <form onSubmit={handlePictureUpload}>
            <input type="file" name="picture" accept="image/*" />
            <button type="submit">Upload</button>
          </form>
          <div className="progress-pictures">
            {progressPictures.map(picture => (
              <img key={picture._id} src={picture.pictureURL} alt="Progress" />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
    <div class="text-wrapper">
    <p2>
      Make fitness your basic. Bee Avci Gym you have been sporting since
      $29,99 every 4 weeks and you get a free sports bag. Go for it!
    </p2>
    <p2>
      Make fitness your basic. Bee Avci Gym you have been sporting since
      $29,99 every 4 weeks and you get a free sports bag. Go for it!
    </p2>
  </div>
  </body2>
  );
};

export default Profile;
