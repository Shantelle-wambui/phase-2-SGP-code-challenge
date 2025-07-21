import React, { useState, useEffect } from "react";
import GoalList from "./components/GoalList";
import DepositForm from "./components/DepositForm";
import GoalForm from "./components/GoalForm"
import Overview from "./components/Overview";

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
  function handleDeposit(goalId, depositAmount) {
  const goalToUpdate = goals.find(goal => goal.id === goalId);
  //here first i find the goal that matches the id

  if (!goalToUpdate) return;
  //if there is no goal found ,exit early

  const updatedSavedAmount = goalToUpdate.savedAmount + depositAmount;
  //then calculate the new saved amount by adding the deposit to the currene

  fetch(`http://localhost:3000/goals/${goalId}`, { 
    //i then sena a patch request to the json server to update the goal's saved amount
    method: "PATCH", //only update part of the goal
    headers: {
      "Content-Type": "application/json", //here sending json data
    },
    body: JSON.stringify({ saved: updatedSavedAmount }), //only update the saved amount
  })
    .then((res) => res.json()) //converts the response to json
    .then((updatedGoal) => {
      handleUpdateGoal(updatedGoal);
      //then after updating  on the server reflect the change in local state
    });
}


  return(
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <GoalForm onAddGoal={handleAddGoal} />
      {/*this handleAddGoal function is passed as a prop to allow the form to send new data to app*/}

      <DepositForm goals= {goals} onDeposit={handleDeposit} />
      <Overview goals={goals} />
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