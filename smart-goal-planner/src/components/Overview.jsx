import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length; //total number of goals

  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  //sum of saved amounts across all goals

  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  //number of completed goals

  const now = new Date(); //current time

  const deadlineWarnings = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    const timeDiff = deadline - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert ms to days

    return goal.savedAmount < goal.targetAmount && (daysLeft <= 30 || daysLeft < 0);
    // includes goals that are not complete and have deadlines within 30 days or missed
  });

  return (
    <div className="overview">
      <h2>Overview</h2>

      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Goals Completed:</strong> {completedGoals}</p>
      <p><strong>Total Saved:</strong> KES {totalSaved.toLocaleString()}</p>

      <h4>Status per Goal</h4>
      <ul>
        {goals.map(goal => {
          const deadline = new Date(goal.deadline);
          const daysLeft = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
          const isCompleted = goal.savedAmount >= goal.targetAmount;

          let status = "";
          if (isCompleted) {
            status = "✅ Completed";
          } else if (daysLeft < 0) {
            status = `🟥 Deadline missed`;
          } else if (daysLeft <= 30) {
            status = `🟡 ${daysLeft} day(s) left`;
          }``

          return (
            <li key={goal.id}>
              <strong>{goal.name}</strong> — {status}
            </li>
          );
        })}
      </ul>

      {deadlineWarnings.length > 0 && (
        <div>
          <h4>Deadlines</h4>
          <ul>
            {deadlineWarnings.map((goal) => {
              const daysLeft = Math.ceil((new Date(goal.deadline) - now) / (1000 * 60 * 60 * 24));

              const label =
                daysLeft < 0
                  ? `❌ Overdue by ${Math.abs(daysLeft)} day(s)`
                  : `⏳ Only ${daysLeft} day(s) left`;
                  //label for deadline status
                  
                  console.log("Deadline Warnings:", deadlineWarnings);


              return (
                <li key={goal.id}>
                  <strong>{goal.name}</strong> — {label}
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
