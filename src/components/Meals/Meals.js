import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvailabelMeals from "./AvailableMeals";

function Meals() {
  return (
    <Fragment>
      <MealsSummary />
      <AvailabelMeals />
    </Fragment>
  );
}

export default Meals;
