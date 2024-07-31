const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/profile`;

const getProfile = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch profile');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateProfile = async (userId, profileData) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    if (!res.ok) {
      throw new Error('Failed to update profile');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  getProfile,
  updateProfile,
};