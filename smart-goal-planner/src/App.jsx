import { useState } from "react";
import GoalForm from "../public/components/GoalForm"; //imports the GoalForm comoponent

function App () {
  const[goals, setGoals] = useState([]); //then i useState to keep track of all the saving goals the user adds

  function handleAddGoal(newGoal) {  
    setGoals([...goals, newGoal]);  // i then use spread operator to create a new array with the previos goals and the new ones at the end
  }
  return(
    <div className="App">
      <h1>Smart Goal Planner</h1>

      <GoalForm onAddGoal={handleAddGoal} />
      {/*this handleAddGoal function is passed as a prop to allow the form to send new data to app*/}
    </div>
  )
}

export default App;