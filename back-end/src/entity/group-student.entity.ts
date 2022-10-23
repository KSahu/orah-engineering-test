import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, JoinColumn } from "typeorm"
import { Group } from "./group.entity"
import { Student } from "./student.entity"

@Entity()
export class GroupStudent {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  student_id: number

  @Column()
  group_id: number

  @Column()
  incident_count: number

  @ManyToOne(()=>Group, (group) => group.groupStudents)
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id'
  })
  group: Group; 

  @ManyToOne(()=>Student, (student) => student.groupStudents)
  @JoinColumn({
    name: 'student_id',
    referencedColumnName: 'id'
  })
  student: Student;
}
