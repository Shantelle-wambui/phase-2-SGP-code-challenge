import React from "react";
import DepositForm from "./DepositForm";

function GoalCard ({goal, onUpdateGoal,onDeleteGoal}) {
    const {id, name, category, targetAmount, savedAmount, deadline} = goal;

    const daysLeft= Math.ceil(
        (new Date(deadline) - Date.now()) /(1000*60*60*24)
    );
    //the new Date(deadline) converts the deadline string into a date object
    //Date.now() gets the current time in milliseconds
    //then dividing 1000*60*60*24 turns the millisecond into days
    //math.ceil() then rounds up the result to the nearest whole day

    const progressPercent = Math.min(  //here i figure out how much percentage has been saved so far
      Math.round((savedAmount / targetAmount)*100),
      100 //limit to max 100%
    );

    const isCompleted =savedAmount >= targetAmount; //then check if the goal is complete

    let warning ="";
    if(!isCompleted && daysLeft <= 30 && daysLeft >=0){
        warning="Deadline approaching";
    }else if(!isCompleted && daysLeft <0 ){
        warning="Deadline missed";
    }//here i create a message based on deadline urgency

    

    function handleDelete() {  //this handles deleting the goal from the database
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        onDeleteGoal(id); // Tell the parent to remove this goal from the list
      });
  }

    return (
        <div className="goal-card">
            <h2>{name}</h2>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Target:</strong> Ksh {targetAmount}</p>
            <p><strong>Saved:</strong> Ksh {savedAmount}</p>
            <p><strong>Deadline:</strong> {deadline}</p>

            {/* progress bar and label */}
        <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        ></div>
        </div>
        <p><strong>Progress:</strong> {progressPercent}%</p>
             {!isCompleted && <p><strong>{warning}</strong></p>}

              {!isCompleted && (
             <DepositForm goal={goal} onUpdateGoal={onUpdateGoal} />
              )}

              {/* show DepositForm only if goal is not yet complete */}
              <button onClick={handleDelete}>Delete Goal</button>  
        </div>
    );
}

export default GoalCard;