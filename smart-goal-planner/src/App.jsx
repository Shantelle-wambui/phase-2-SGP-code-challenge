import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import GoalForm from "./components/GoalForm"

function App () {
  const[goals, setGoals] = useState([]); //then i useState to keep track of all the saving goals the user adds

   useEffect(() => {
    fetch("http://localhost:3000/goals") // Replaces with your JSON server URL
      .then((res) => res.json())         // Parses the response into JSON
      .then((data) => setGoals(data));   // Saves the goals into state
  }, []);

  function handleAddGoal(newGoal) {  
    setGoals([...goals, newGoal]);  // i then use spread operator to create a new array with the previos goals and the new ones at the end
  }
   
  function handleUpdateGoal(updatedGoal) {  //then update a goal after a deposit
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    setGoals(updatedGoals);
  }

   function handleDeleteGoal(deletedGoalId) { //this deletes a goal
    const updatedGoals = goals.filter((goal) => goal.id !== deletedGoalId);
    setGoals(updatedGoals);
  }

  return(
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <GoalForm onAddGoal={handleAddGoal} />
      {/*this handleAddGoal function is passed as a prop to allow the form to send new data to app*/}

      <GoalList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />
      {/* Render the list of all current goals */}

    </div>
  )
}

export default App;