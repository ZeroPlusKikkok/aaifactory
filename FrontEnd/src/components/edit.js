import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   emCard: "",
   firstName: "",
   lastName: "",
   position: "",
   department: "",
   dateStart: "",
   employees: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3000/api/employees/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const employee = await response.json();
     if (!employee) {
       window.alert(`Employee with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(employee);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedEmployee = {
     emCard: form.emCard,
     firstName: form.firstName,
     lastName: form.lastName,
     position: form.position,
     department: form.department,
     dateStart: form.dateStart,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3000/api/employees/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedEmployee),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="emCard">Employee Code: </label>
         <input
           type="text"
           className="form-control"
           id="emCard"
           value={form.emCard}
           onChange={(e) => updateForm({ emCard: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="firstName">First Name: </label>
         <input
           type="text"
           className="form-control"
           id="firstName"
           value={form.firstName}
           onChange={(e) => updateForm({ firstName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="lastName">Last Name: </label>
         <input
           type="text"
           className="form-control"
           id="lastName"
           value={form.lastName}
           onChange={(e) => updateForm({ lastName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="position">Position: </label>
         <input
           type="text"
           className="form-control"
           id="position"
           value={form.position}
           onChange={(e) => updateForm({ position: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="department">Department: </label>
         <input
           type="text"
           className="form-control"
           id="department"
           value={form.department}
           onChange={(e) => updateForm({ department: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="dateStart">Date Start: </label>
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
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
