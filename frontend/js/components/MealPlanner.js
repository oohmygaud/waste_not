import React from 'react';
import useFetch from 'use-http';

const MealPlanner = () => {
    const [meal, setMeal] = React.useState();
    const { loading, error, data = [], get } = useFetch('http://127.0.0.1:8000/api/food_items/?status=in_pantry', []);
    
    const generateMeal = () => {
        let meat_list = [];
        let veggie_list = [];
        let fruit_list = [];
        let carbs_list = [];
        data.forEach((item) => {
            if(item.category == "meat") meat_list.push(item.name)
            if(item.category == "vegetable") veggie_list.push(item.name)
            if(item.category == "fruit") fruit_list.push(item.name)
            if(item.category == "carbs") carbs_list.push(item.name) 
        })
        
        const new_meal = {
            meat: meat_list[Math.floor(Math.random()*meat_list.length)],
            veggie: veggie_list[Math.floor(Math.random()*veggie_list.length)],
            fruit: fruit_list[Math.floor(Math.random()*fruit_list.length)],
            carbs: carbs_list[Math.floor(Math.random()*carbs_list.length)],
        }
        console.log('Generated', new_meal)
        return new_meal;
    }

    return (
        <div className="container p-5" style={{ textAlign: "center"}}>
            <button
                style={{ marginBottom: "1em"}}
                className="btn btn-warning" 
                type="submit" 
                onClick={() => setMeal(generateMeal())}
            >
                Plan My Meal
            </button>
            <div>
                {meal ? meal.meat : ''}
            </div>
            <div>
                {meal ? meal.veggie : ''}
            </div>
            <div>
                {meal ? meal.fruit : ''}
            </div>
            <div>
                {meal ? meal.carbs : ''}
            </div>
        </div>
    )
};

export default MealPlanner;
