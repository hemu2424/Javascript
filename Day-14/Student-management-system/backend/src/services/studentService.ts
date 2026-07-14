import Student,{IStudent} from "../models/Student"

class StudentService {
  async createStudent(studentData: Partial<IStudent>): Promise<IStudent> {
    return await Student.create(studentData);
  }
  async getAllStudents(): Promise<IStudent[]>{
    return await Student.find();
  }
  async deleteStudent(id:string):Promise<IStudent | null>{
    return await Student.findByIdAndDelete(id);
  }
    async updateStudent(
    id: string,
    studentData: Partial<IStudent>
  ): Promise<IStudent | null> {
    return await Student.findByIdAndUpdate(id, studentData, {
      new: true,
      runValidators: true,
    });
  }
  async getStudentByID(id:string):Promise<IStudent | null>{
    return await Student.findById(id)
  }
  async searchStudents(search: string): Promise<IStudent[]> {
    return await Student.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { course: { $regex: search, $options: "i" } },
      ],
    });
  }

}
export default new StudentService();