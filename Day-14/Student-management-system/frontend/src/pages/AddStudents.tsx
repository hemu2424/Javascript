import React, { useState } from 'react'
import type { Student } from '../types/Students'
import { createStudent } from '../services/studentApi';
import { Navigate, useNavigate } from 'react-router-dom';

const AddStudents = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: 0,
    course: "",
  });


  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();

    try{
      await createStudent(student);
        alert("student added successfully");
        navigate("/students");
    }
       catch (error) {
      console.error(error);
      alert("Failed to add student");
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setStudent((prev)=>({
      ...prev,[name]:name === "age" ? Number(value):value,
    }))


  }


  return (
    <>
      <h1>add students</h1>
      <form onSubmit={handleSubmit}>

        <input 
        type="text"
        name="firstName"
        placeholder="first name"
        value={student.firstName}
        onChange={handleChange}/>
        <br></br>
        <input 
        type="text"
        name="lastName"
        placeholder="last name"
        value={student.lastName}
        onChange={handleChange}/>
        <br></br><input 
        type="number"
        name="age"
        placeholder="age"
        value={student.age}
        onChange={handleChange}/>
        <br></br><input 
        type="text"
        name="course"
        placeholder="course"
        value={student.course}
        onChange={handleChange}/>
        <br></br><input 
        type="text"
        name="email"
        placeholder="email"
        value={student.email}
        onChange={handleChange}/>
        <br></br>
        <input 
        type="text"
        name="phone"
        placeholder="phonenumber"
        value={student.phone}
        onChange={handleChange}/>
        <br></br>


        <button type='submit'>add student</button>

      </form>
      
  </>
  )
}

export default AddStudents
