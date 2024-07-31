import { useContext, useState, useEffect } from 'react';
import { AuthedUserContext } from '../../App';
import * as mealService from '../../services/mealService';
import './meals.css';

const Meals = () => {
    const user = useContext(AuthedUserContext);
    const [meals, setMeals] = useState([]);
    const [newMeal, setNewMeal] = useState({ date: '', foodItems: [{ name: '', carbs: '', fats: '', protein: '' }] });

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const mealsData = await mealService.getMeals(user._id);
                setMeals(mealsData);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMeals();
    }, [user]);

    const handleAddMeal = async () => {
        try {
            const mealData = {
                date: newMeal.date,
                foodItems: newMeal.foodItems.map(item => ({
                    name: item.name,
                    carbs: parseInt(item.carbs, 10),
                    fats: parseInt(item.fats, 10),
                    protein: parseInt(item.protein, 10),
                })),
            };
            const meal = await mealService.addMeal(user._id, mealData);
            setMeals([...meals, meal]);
            setNewMeal({ date: '', foodItems: [{ name: '', carbs: '', fats: '', protein: '' }] });
        } catch (err) {
            console.error(err);
        }
    };

    const handleFoodItemChange = (index, field, value) => {
        const newFoodItems = newMeal.foodItems.slice();
        newFoodItems[index][field] = value;
        setNewMeal({ ...newMeal, foodItems: newFoodItems });
    };

    const handleAddFoodItem = () => {
        setNewMeal({ ...newMeal, foodItems: [...newMeal.foodItems, { name: '', carbs: '', fats: '', protein: '' }] });
    };

    const calculateTotalCalories = (foodItems) => {
        return foodItems.reduce((total, item) => {
            return total + (item.carbs * 4) + (item.protein * 4) + (item.fats * 9);
        }, 0);
    };

    return (
        <main>
            <h1>{user.username}'s Meals</h1>
            <div>
                <input
                    type="date"
                    value={newMeal.date}
                    onChange={(e) => setNewMeal({ ...newMeal, date: e.target.value })}
                    placeholder="Date"
                />
                {newMeal.foodItems.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleFoodItemChange(index, 'name', e.target.value)}
                            placeholder="Food item"
                        />
                        <input
                            type="number"
                            value={item.carbs}
                            onChange={(e) => handleFoodItemChange(index, 'carbs', e.target.value)}
                            placeholder="Carbs"
                        />
                        <input
                            type="number"
                            value={item.fats}
                            onChange={(e) => handleFoodItemChange(index, 'fats', e.target.value)}
                            placeholder="Fats"
                        />
                        <input
                            type="number"
                            value={item.protein}
                            onChange={(e) => handleFoodItemChange(index, 'protein', e.target.value)}
                            placeholder="Protein"
                        />
                    </div>
                ))}
                <button onClick={handleAddFoodItem}>Add Food Item</button>
                <button onClick={handleAddMeal}>Add Meal</button>
            </div>
            {meals.map(meal => (
                <div key={meal._id}>
                    <h2>{new Date(meal.date).toLocaleDateString()}</h2>
                    <p>Total Calories: {calculateTotalCalories(meal.foodItems)}</p>
                    <ul>
                        {meal.foodItems.map((item, index) => (
                            <li key={index}>{item.name} - Carbs: {item.carbs}g, Fats: {item.fats}g, Protein: {item.protein}g</li>
                        ))}
                    </ul>
                </div>
            ))}
        </main>
    );
};

export default Meals;
