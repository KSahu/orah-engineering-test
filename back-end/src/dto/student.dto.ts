import { Student } from "../entity/student.entity";

export class StudentDto {
    private id: number;
    private first_name: string;
    private last_name: string;
    private full_name: string;
    constructor(student: Student) {
     this.id = student.id;
     this.first_name = student.first_name;
     this.last_name = student.last_name;
     this.full_name = `${student.first_name} ${student.last_name}`
    }
}