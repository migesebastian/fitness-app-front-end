const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;


const getMeals = async (userId) => {
  try {
    const res = await fetch(`${BACKEND_URL}/meals/${userId}`, {
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

const addMeal = async (userId, mealData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/meals/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(mealData),
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

export { getMeals, addMeal };
