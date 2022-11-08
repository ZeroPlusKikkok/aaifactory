import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
  emCard: "",
  firstName: "",
  lastName: "",
  position: "",
  department: "",
  dateStart: ""
 });

 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newEmployee = { ...form };
 
   await fetch("http://localhost:3000/api/employees/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newEmployee),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ emCard: "", firstName: "", lastName: "", position: "", department: "", dateStart: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="emCard">Employee Code</label>
         <input
           type="text"
           className="form-control"
           id="emCard"
           value={form.emCard}
           onChange={(e) => updateForm({ emCard: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="firstName">First Name</label>
         <input
           type="text"
           className="form-control"
           id="firstName"
           value={form.firstName}
           onChange={(e) => updateForm({ firstName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="lastName">Last Name</label>
         <input
           type="text"
           className="form-control"
           id="lastName"
           value={form.lastName}
           onChange={(e) => updateForm({ lastName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Position</label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="department">Department</label>
         <input
           type="text"
           className="form-control"
           id="department"
           value={form.department}
           onChange={(e) => updateForm({ department: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="dateStart">Date Start</label>
         <input
           type="text"
           className="form-control"
           id="dateStart"
           value={form.dateStart}
           onChange={(e) => updateForm({ dateStart: e.target.value })}
         />
       </div>

       <br />
       
       <div className="form-group">
         <input
           type="submit"
           value="Create Employee"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
