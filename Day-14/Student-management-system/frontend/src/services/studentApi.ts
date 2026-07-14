import axios from "axios";
import type { Student } from "../types/Students";

const studentApi = axios.create({
  baseURL: "http://localhost:3000/students",
});

export const getAllStudents = async (): Promise<Student[]> => {
  const response = await studentApi.get("/");

  return response.data.data;
};
export const createStudent = async (student:Student): Promise<Student> =>{
const response = await studentApi.post("/",student)
return response.data.data
}
export const updateStudent = async(id:string,student:Student):Promise<Student> =>{
    const response = await studentApi.put(`/${id}`,student)
    return response.data.data
}
export const getstudentById = async(id:string):Promise<Student> =>{
    const response = await studentApi.get(`/${id}`)
    return response.data.data
}
export const deleteStudent = async(id:string):Promise<void> =>{
    const response = await studentApi.delete(`/${id}`)
    return response.data.data
}
export const searchStudents = async(search :string)=>{
    const response = await studentApi.get(`/search?search=${search}`);
    return response.data.data
}

export default studentApi;              