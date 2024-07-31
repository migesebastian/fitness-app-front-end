const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

const getProfile = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
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
    return json.user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateProfile = async (userId, profileData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/profiles/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(profileData),
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

const uploadProgressPicture = async (userId, formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/progress-pictures`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
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

export { getProfile, updateProfile, uploadProgressPicture };
