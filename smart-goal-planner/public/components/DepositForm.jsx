import { useState } from "react";

function DepositForm({goal, onUpdateGoal }){
    const [amount, setAmount] = useState(""); //i use state to store whatever number the user types into the deposit input

    function handleSubmit(e){  //runs when the form is submitted
        e.preventDefault(); //this prevents the form from reloading

        const depositAmount =Number(amount);
       //then i convert the input value from a string to a number

        if(!depositAmount|| depositAmount <=0 ) return;
       //if the input is empty or a negative number ,stop here and do nothing

        const updatedSavedAmount = goal.savedAmount +depositAmount;
       //then add the deposit to the current saved amount of this goal


        fetch(`http://localhost:3000/goals/${goal.id}`, { 
         //here i send a PATCH request to update just the savedAmount of this goal on the server

            method: "PATCH" , 
            headers: {
                "Content-Type": "application/json" , //lets the server know i am sending json
            },
            body: JSON.stringify({ savedAmount : updatedSavedAmount}),  //sends the new savedAmount
    
        })
        .then((res) => res.json()) //converts the server response into a uasable object
        .then((updatedGoal) => {
            onUpdateGoal(updatedGoal);

            setAmount(""); //clears the input field after submitting
        });
    }
    return (

        <form onSubmit={handleSubmit}>
            {/*Input field for the user to type how much money they want to deposit*/}
            <input
            type="number"  //makes sure only numbers can be entered
            placeholder="Deposit amount"  //placeholder text for input
            value={amount}  //the value of input is tied to state
            onChange={(e) =>setAmount(e.target.value)} //updates the state when the user types
            min="1"  //minimum value allowed is 1
            required
            />
            {/*button that submits the form when clicked*/}
            <button type="submit">Deposit</button>
        </form>
    );
}
export default DepositForm;