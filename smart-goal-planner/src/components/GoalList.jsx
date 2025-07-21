import React from "react";
import GoalCard from "./GoalCard"

function GoalList({goals, onUpdateGoal, onDeleteGoal }) {
    return (
    <div className="goal-list">
       
      {goals.map((goal) => (

        <GoalCard
          key={goal.id}
          goal={goal}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
        />
        ))}
         {/* loop through each goal and render a GoalCard */}
    </div>
  );
        
}
export default GoalList;