import {Request,Response} from "express"

import studentService from "../services/studentService"

class StudentController {
        async createStudent(req: Request, res: Response): Promise<void> {
  

    try {
        const student = await studentService.createStudent(req.body);

        res.status(201).json({
            success: true,
            message: "Student added successfully",
            data: student
        });
    } catch (error: any) {
        res.status(409).json({
            success: false,
            message: error.message
        });
    }
}
        async getAllstudent(req:Request,res:Response):Promise<void>{
            try{
                const students = await studentService.getAllStudents();
                res.status(200).json({
                    success:true,
                    message:"all fetched data",
                    data:students,
                })
            }
            catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });

                }
            
        }
        async deleteStudent(req:Request,res:Response):Promise<void>{
            try{
                const { id } = req.params;
                const student = await studentService.deleteStudent(id as string)

                if(!student){
                    res.status(404).json({
                        success:false,
                        message:"student not found"
                    });
                    return;

                }
                
                res.status(200).json({
                    success:true,
                    message:"student got deleted",
                    data:student,
                })
            }
            catch(error:any){
                res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
        }
         async updateStudent(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const student = await studentService.updateStudent(
        id as string,
        req.body
      );

      if (!student) {
        res.status(404).json({
          success: false,
          message: "Student not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Student updated successfully",
        data: student,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getStudentById(req:Request,res:Response):Promise<void>{
    try{
        
        const student = await studentService.getStudentByID(req.params.id as string)
        if(!student){
            res.status(404).json({
                success:true,
                message:"not found",
                data:student
            })
            return;
        }
        res.status(200).json({
            success:true,
            message:"found successfully",
            data:student
        })
    }
    catch(error:any){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
  }
    async searchStudents(req: Request, res: Response): Promise<void> {
    try {
      const search = req.query.search as string;

      const students = await studentService.searchStudents(search);

      res.status(200).json({
        success: true,
        count: students.length,
        data: students,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

}
export default new StudentController();