import { useState, useEffect } from 'react';
import { index, create, update, deleteMeal } from './mealService';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    const fetchedMeals = await index();
    setMeals(fetchedMeals);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (selectedMeal) {
      await handleUpdateMeal(formData, selectedMeal._id);
    } else {
      await handleAddMeal(formData);
    }
    resetForm();
    fetchMeals();
  };

  const handleAddMeal = async (mealData) => {
    await create(mealData);
  };

  const handleUpdateMeal = async (mealData, mealId) => {
    await update(mealId, mealData);
  };

  const handleDeleteMeal = async (mealId) => {
    await deleteMeal(mealId);
    fetchMeals();
  };

  const resetForm = () => {
    setFormData({
      date: '',
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    });
    setSelectedMeal(null);
    setIsEditing(false);
  };

  const startEditing = (meal) => {
    setFormData({
      date: meal.date,
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fats: meal.fats,
    });
    setSelectedMeal(meal);
    setIsEditing(true);
  };

  return (
    <main>
      {!isEditing ? (
        <div>
          <h1>Meals</h1>
          <ul>
            {meals.map((meal) => (
              <li key={meal._id}>
                <p><strong>Date:</strong> {meal.date}</p>
                <p><strong>Meal Name:</strong> {meal.name}</p>
                <p><strong>Calories:</strong> {meal.calories}</p>
                <p><strong>Protein:</strong> {meal.protein} g</p>
                <p><strong>Carbs:</strong> {meal.carbs} g</p>
                <p><strong>Fats:</strong> {meal.fats} g</p>
                <button onClick={() => startEditing(meal)}>Edit Meal</button>
                <button onClick={() => handleDeleteMeal(meal._id)}>Delete Meal</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsEditing(true)}>Add New Meal</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>{selectedMeal ? 'Edit Meal' : 'Log Meal'}</h1>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Meal Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="calories">Calories</label>
          <input
            type="number"
            name="calories"
            id="calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />
          <label htmlFor="protein">Protein (g)</label>
          <input
            type="number"
            name="protein"
            id="protein"
            value={formData.protein}
            onChange={handleChange}
            required
          />
          <label htmlFor="carbs">Carbs (g)</label>
          <input
            type="number"
            name="carbs"
            id="carbs"
            value={formData.carbs}
            onChange={handleChange}
            required
          />
          <label htmlFor="fats">Fats (g)</label>
          <input
            type="number"
            name="fats"
            id="fats"
            value={formData.fats}
            onChange={handleChange}
            required
          />
          <button type="submit">{selectedMeal ? 'Update Meal' : 'Log Meal'}</button>
          <button type="button" onClick={resetForm}>Cancel</button>
        </form>
      )}
    </main>
  );
};

export default Meals;