import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Employee = (props) => (
 <tr>
   <td>{props.employee.emCard}</td>
   <td>{props.employee.firstName}</td>
   <td>{props.employee.lastName}</td>
   <td>{props.employee.position}</td>
   <td>{props.employee.department}</td>
   <td>{props.employee.dateStart}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.employee._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteEmployee(props.employee._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
 
export default function EmployeeList() {
 const [employees, setEmployees] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getEmployees() {
     const response = await fetch(`localhost:3000/api/employees/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
     });
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const employee = await response.json();
     setEmployees(employee);
   }
 
   getEmployees();
 
   return;
 }, [employees.length]);
 
 // This method will delete a record
 async function deleteEmployee(Id) {
   await fetch(`http://localhost:3000/api/employees/delete/${Id}`, {
     method: "DELETE"
   });
 
   const newEmployee = employees.filter((el) => el._id !== Id);
   setEmployees(newEmployee);
 }
 
 // This method will map out the records on the table
 function EmployeeList() {
   return employees.map((employee) => {
     return (
       <Employee
         employee={employee}
         deleteEmployee={() => deleteEmployee(Employee._id)}
         key={employee._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Employee List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Em Card</th>
           <th>First Name</th>
           <th>Last Name</th>
           <th>Position</th>
           <th>Department</th>
           <th>Date Start</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{EmployeeList()}</tbody>
     </table>
   </div>
 );
}
