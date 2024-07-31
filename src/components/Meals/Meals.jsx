import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as mealService from '../../services/mealService';

const MealForm = (props) => {
  const navigate = useNavigate();
  const { mealId } = useParams();
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        if (mealId) {
          const mealData = await mealService.show(mealId);
          setFormData({
            ...mealData,
            date: formatDate(mealData.date),
          });
        }
      } catch (err) {
        updateMessage(err.message);
      }
    };
    fetchMeal();
  }, [mealId]);

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mealId) {
        await mealService.update(mealId, formData);
      } else {
        await mealService.create(formData);
      }
      navigate('/meals');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };

  return (
    <main>
      <h1>{mealId ? 'Edit Meal' : 'Log Meal'}</h1>
      <p>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            autoComplete="off"
            id="date"
            value={formData.date}
            name="date"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">Meal Name:</label>
          <input
            type="text"
            autoComplete="off"
            id="name"
            value={formData.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="calories">Calories:</label>
          <input
            type="number"
            autoComplete="off"
            id="calories"
            value={formData.calories}
            name="calories"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="protein">Protein (g):</label>
          <input
            type="number"
            autoComplete="off"
            id="protein"
            value={formData.protein}
            name="protein"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="carbs">Carbs (g):</label>
          <input
            type="number"
            autoComplete="off"
            id="carbs"
            value={formData.carbs}
            name="carbs"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fats">Fats (g):</label>
          <input
            type="number"
            autoComplete="off"
            id="fats"
            value={formData.fats}
            name="fats"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">{mealId ? 'Update Meal' : 'Log Meal'}</button>
          <Link to="/meals">
            <button type="button">Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default MealForm;