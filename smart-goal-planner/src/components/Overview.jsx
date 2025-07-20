import React from "react";

function Overview({goals}) {

    const totalGoals = goals.length; //total number of goals

    const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0); 
    //this is the total saved amount across all goals


    const now = new Date(); //this gets the current date and time

    const deadlineWarnings = goals.filter((goal) => {
    const deadline = new Date(goal.deadline);
    const timeDiff = deadline - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert ms to days
    return daysLeft <= 7;
  });
  //then i filter all goals with deadlines within the next 7 days or already missed
 return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      {/* Displays total number of goals */}
   
      <p>Total Saved: KES {totalSaved.toLocaleString()}</p>
       {/* Display total saved amount in Kenyan Shillings */}

      {deadlineWarnings.length > 0 && ( 
        
        <div>
          <h4> Deadlines</h4>
          <ul>
            {deadlineWarnings.map((goal) => {
              const daysLeft = Math.ceil((new Date(goal.deadline) - now) / (1000 * 60 * 60 * 24));
              
              const label =
                daysLeft < 0
                  ? `❌ Deadline Missed by ${Math.abs(daysLeft)} day(s)`
                  : `⏳ ${daysLeft} day(s) left`;
              // Determine the appropriate label based on days left

              return (
                <li key={goal.id}>
                  {goal.title} — {label}
                    {/* Show the goal title and deadline status */}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Overview;