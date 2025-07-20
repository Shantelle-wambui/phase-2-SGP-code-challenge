import React from "react";

function Overview({ goals }) {
  const totalGoals = goals.length; //total number of goals

  const totalSaved = goals.reduce((sum, goal) => sum + goal.saved, 0);
  //sum of saved amounts across all goals

  const completedGoals = goals.filter(goal => goal.saved >= goal.target).length;
  //number of completed goals

  const now = new Date(); //current time

  const deadlineWarnings = goals.filter(goal => {
    const deadline = new Date(goal.deadline);
    const timeDiff = deadline - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // convert ms to days

    return goal.saved < goal.target && (daysLeft <= 30 || daysLeft < 0);
    // includes goals that are not complete and have deadlines within 30 days or missed
  });

  return (
    <div className="overview">
      <h2>Overview</h2>

      <p><strong>Total Goals:</strong> {totalGoals}</p>
      <p><strong>Goals Completed:</strong> {completedGoals}</p>
      <p><strong>Total Saved:</strong> KES {totalSaved.toLocaleString()}</p>

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

              return (
                <li key={goal.id}>
                  <strong>{goal.title}</strong> — {label}
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
