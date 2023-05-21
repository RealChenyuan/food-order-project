import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

function AvailabelMeals() {
  const { isLoading, error, sendRequest: fetchMeals } = useHttp();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const getMeals = function (data) {
      const loadedMeals = [];

      data.forEach((meal) => {
        loadedMeals.push(meal);
      });

      setMeals(loadedMeals);
    };

    const request = {
      url: "https://react-http-87d82-default-rtdb.firebaseio.com/meals.json",
    };

    fetchMeals(request, getMeals);
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        detail={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <Card className={classes["meals"]}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && <ul>{mealsList}</ul>}
      {!isLoading && error && <p>{error}</p>}
    </Card>
  );
}

export default AvailabelMeals;
