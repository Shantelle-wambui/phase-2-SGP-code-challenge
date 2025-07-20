# Smart Goal Planner

A Smart Goal Planner for managing personal savings goals, making deposits, and tracking progress, powered by React and `json-server`.

---

## Features

### Goal Management (CRUD)
- Create new financial goals (e.g., Travel Fund, Emergency Fund)
- Edit existing goals: name, target, category, deadline
- Delete goals
- Data is saved using `json-server`

### Make Deposits
- Add deposits to any goal
- The saved amount updates immediately
- Changes are shown visually in the goal's progress

### Progress Tracking
- Track the amount saved compared to the target
- View the remaining balance
- Visual progress bar

### Deadline Awareness
- See how many days are left until each goal’s deadline
- Receive warnings for approaching deadlines
- Get overdue labels for missed goals
- Gain completed status when the target is reached

### Overview Dashboard
- Total number of goals
- Total saved across all goals
- Summary of completed goals
- Alerts for deadlines

---

## Tech Stack

- **React**
- **json-server** (local REST API)
- **CSS** (custom styles)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/smart-goal-planner.git
cd smart-goal-planner
```
- Install dependancies
- Start json-server, json-server --watch db.json --port 3000
- Run the react app in a new terminal, npm run dev

