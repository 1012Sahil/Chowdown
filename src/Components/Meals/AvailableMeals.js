import classes from "./AvailableMeals.module.css";
import { useState, useEffect } from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [httpError, setHttpError] = useState(null); // dealing with errors in fetch
  // using useEffect to load the data for the first time page is visited
  useEffect(() => {
    // using firebase, need to add meals.json at end as required by firebase
    const fetchMeals = async () => {
      setLoading(true);
      const response = await fetch(
        "https://food-order-app-3c99a-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        // check if fetch was successful or not
        throw new Error("Something went wrong! Meals could not be fetched.");
      }
      // responseData from firebase will always be an object
      const responseData = await response.json();
      const loadedMeals = [];
      // in firebase, each node has a unique id and our data is nested inside this node
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setLoading(false);
    };
    /* We will encounter infinite loading if we do error handling like this. Recall that fetchMeals() itself
    is an async function and will always return a promise. If we encounter an error in an async function, 
    that error will cause that promise to reject! So we can't use try catch to wrap it.  */
    /*try {
      fetchMeals();
    } catch (error) {
      setLoading(false); // stop loading to prevent infinite load
      setHttpError(error.message);
    }*/

    // Instead, we will simply catch the error (if any) by using the catch method
    // This is the traditional promise only way of handling an error inside of a promise
    fetchMeals().catch(error => {
      setLoading(false); // stop loading to prevent infinite load
      setHttpError(error.message);      
    });
  }, []); // no dependencies, will execute only on first render
  // If data is still being fetched, show a loading state and don't execute the code further
  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (<section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>);
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
