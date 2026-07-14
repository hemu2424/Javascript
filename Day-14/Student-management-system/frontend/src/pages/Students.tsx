import React, { useRef } from 'react'
import type {Student} from "../types/Students"
import { useState,useEffect } from 'react'
import { deleteStudent, getAllStudents, searchStudents } from '../services/studentApi'
import { Link } from 'react-router-dom'



const Students = () => {

  const[students,setStudents] = useState<Student[]>([])
  const [loading,setloading] = useState(true);
  const[search,setSearch] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null)

  useEffect(()=>{
    fetchStudents();

  },[])

  const fetchStudents  = async ()=>{
    try{
      const data = await getAllStudents();
      setStudents(data);
    }
    catch(error){
      console.error("Failed to fetch",error)

    }
    finally{
      setloading(false)
    }
  }

  const handleDelete = async(id:string)=>{
    console.log("Deleting id:", id); 
    const isConfirmed = window.confirm(
      "Are u sure u want to delete"
    );

  
    if(!isConfirmed) return;
    try{
      await deleteStudent(id);
      alert("delted succesfully")
      fetchStudents()

    }
    catch(error){
      console.error(error);
      alert("fail to delete")
    }

  }
  const handleSearch = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value;

  setSearch(value);
  if(timer.current) clearTimeout(timer.current)
timer.current = setTimeout(async()=>{
  try {
    if (value.trim() === "") {
      fetchStudents();
      return;
    }

    const data = await searchStudents(value);
  console.log(value)


    setStudents(data);
  } catch (error) {
    console.error(error);
  }
},300)}
  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    <>
    <h1>
      students
    </h1>
    <input
  type="text"
  placeholder="Search by name, email or course..."
  value={search}
  onChange={handleSearch}
  style={{
    padding: "8px",
    width: "300px",
    marginBottom: "20px",
  }}
/><br></br>
<Link to={`/add-student`}>
  <button>Add students</button>
</Link>
    
    {
      students.length === 0 ?(<p> no students found</p>):(
        students.map((student)=>{
         return ( <div
          key={student._id}
          style={{
            border: "1px solid gray",
              marginBottom: "10px",
              padding: "10px",


          }}>
          <h3>{student.firstName} {student.lastName}</h3>
          <p>Email:{student.email}</p>
          <p>age:{student.age}</p>
          <p>phone number:{student.phone}</p>
          <p>course:{student.course}</p>
          <div style={{ marginTop: "10px" }}>
  <Link to={`/edit-student/${student._id}`}>
  <button>Edit</button>
</Link>

  <button
    style={{
      marginLeft: "10px",
    }}
    onClick={() => handleDelete(student._id!)}
  >
    Delete
  </button>
</div>

          </div>)

        })

      )
    }
    

    
  </>)
}

export default Students
