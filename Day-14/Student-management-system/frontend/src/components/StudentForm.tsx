import { useState } from "react";
import type { Student } from "../types/Students";

interface StudentFormProps {
  onSubmit: (student: Student) => void;
}

const StudentForm = ({ onSubmit }: StudentFormProps) => {
  const [student, setStudent] = useState<Student>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    phone:"",
    course:""

  });

  const 
  handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(student);

    setStudent({
      firstName: "",
    lastName: "",
    email: "",
    age: 0,
    phone:"",
    course:""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={student.firstName}
        onChange={handleChange}
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={student.lastName}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
      />

      <button type="submit">
        Add Student
      </button>
    </form>
  );
};

export default StudentForm;