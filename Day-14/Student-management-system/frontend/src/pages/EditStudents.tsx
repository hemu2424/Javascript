import React, { useEffect, useState } from 'react'
import type { Student } from '../types/Students'
import { createStudent, getstudentById, updateStudent } from '../services/studentApi';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const EditStudents = () => {
  const {id} = useParams();
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
      if(!id) return;
      await updateStudent(id,student);
      alert("student updated successfully")
      navigate("/students")
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
  useEffect(()=>{
    fetchStudent();
  },[id]);

  const fetchStudent = async () =>{
      if(!id) return;

    try{
      const data = await getstudentById(id);
      setStudent(data);

    }
    catch(error){
      console.log(error);
    }
  }


  return (
    <>
      <h1>edit students</h1>
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
    placeholder="Phone Number"
    value={student.phone}
    onChange={handleChange}
/>  
        <br></br>


        <button type='submit'>update student</button>

      </form>
      
  </>
  )
}

export default EditStudents
