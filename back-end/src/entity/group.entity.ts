import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { StudentDto } from "../dto/student.dto";
import { CreateGroupInput } from "../interface/group.interface"
import { GroupStudent } from "./group-student.entity";
import { RollStates } from "./roll-states.entity";

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

  // @ManyToMany() https://github.com/typeorm/typeorm/issues/7315
  // @JoinTable({
  //   name: 'group_student',
  //   joinColumn: {
  //     name: 'group_id',
  //     referencedColumnName: 'id'
  //   }, 
  //   inverseJoinColumn: {
  //     name: 'student_id',
  //     referencedColumnName: 'id'
  //   }
  // })
  // students: Student[];

  @OneToMany(() => GroupStudent, groupStudent => groupStudent.group)
  groupStudents: GroupStudent[];

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
    this.groupStudents?.forEach(groupStudent => {
      studentDto.push(new StudentDto(groupStudent.student))
    });
    return studentDto
  }

  public getStates(): string[] {
    const states = [];
    this.roll_states.forEach( (rollState) => {
      states.push(rollState.name);
    });
    return states;
  }
}
