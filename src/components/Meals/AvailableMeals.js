import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { useEffect, useState } from "react";

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
