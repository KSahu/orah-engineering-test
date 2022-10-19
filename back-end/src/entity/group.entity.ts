import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { StudentDto } from "../dto/student.dto";
import { CreateGroupInput } from "../interface/group.interface"
import { RollStates } from "./roll-states.entity";
import { Student } from "./student.entity";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  number_of_weeks: number;

  @ManyToMany(() => RollStates, {
    cascade: true,
  })
  @JoinTable()
  roll_states: RollStates[];

  @Column()
  incidents: number;

  @Column()
  ltmt: string;

  @Column({
    nullable: true,
  })
  run_at: Date;

  @Column()
  student_count: number;

  @ManyToMany(() => Student, {
    cascade: true
  })
  @JoinTable({
    name: "group_student",
    joinColumn: {
      name: "group_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "student_id",
      referencedColumnName: "id"
    }
  })
  students: Student[];

  public prepareToCreateOrUpdate(input: CreateGroupInput) {
    this.name = input.name;
    this.number_of_weeks = input.number_of_weeks;
    this.roll_states = input.roll_states as RollStates[];
    this.incidents = input.incidents;
    this.ltmt = input.ltmt;
    this.student_count = this.student_count ? this.student_count : 0;
  }

  public getStudents(): StudentDto[] {
    const studentDto: StudentDto[] = [];
    this.students?.forEach(student => {
      studentDto.push(new StudentDto(student))
    });
    return studentDto
  }
}
