import{ useState } from "react";

function GoalForm ({ onAddGoal}){  

    const [formData, setFormData] = useState ({ //i use state to keep track of the current values the user types into the form.
        name: "",    //this is the name of the saving goal
        targetAmount: "",  //the amount of money the user wants to save
        category: "",  //this is the category of the goal
        deadline: "",  //and this the deadline to reach the saving goal
    });

    function handleChange (e) {  //here this runs when the form is submitted,when add goal button is clicked
        const {name, value } = e.target;

        setFormData({  //then i spread the previous formdata ,then update only the changed field.
            ...formData,
            [name]:value,
        });
    }
    function handleSubmit (e) {
        e.preventDefault(); //this stops the page from reloading

        const newGoal = {
            ...formData,   //spread in name,targetAmount,category and deadline
            targetAmount: Number(formData.targetAmount),   //converts the amount from string to number
            savedAmount: 0, 
            createdAt: new Date().toISOString().split("T")[0],  //gets today's date in yyyy-mm-dd format
            id: crypto.randomUUID(),  //generates a unique id for the goal
        };

        fetch("http://localhost:3000/goals" , { //then sends the new goal to the backend json-server
            method: "POST" ,
            headers: {
                "Content-Type": "application/json", //here i am sending JSON data

            },
            body: JSON.stringify(newGoal), //then convert the js object to a json string
        })
        .then((res) => res.json()) //then parses the json response from the server
        .then((data) => {
            onAddGoal(data);

            setFormData({  //then i clear the form after submission
                name: "",
                targetAmount: "",
                category: "",
                deadline: "",
            });

        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Goal</h2>
            {/* input for the goal name */}
            <input
            name="name"
            placeholder="Goal Name"
            value={formData.name}
            onChange={handleChange}
            required
            />

            {/*input for the target amount*/}
            <input
            name="targetAmount"
            type="number"
            placeholder="Target Amount"
            value={formData.targetAmount}
            onChange={handleChange}
            required/>
            {/*input for goal category*/}
            <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required/>
            {/*input for deadline*/}
            <input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
            required />

            {/*Submit button*/}
            <button type="submit">Add Goal</button>

        </form>
    );
}
export default GoalForm;