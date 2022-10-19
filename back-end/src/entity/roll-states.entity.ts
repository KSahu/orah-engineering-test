import { Entity, PrimaryGeneratedColumn, Column, Unique, Index } from "typeorm"

@Entity()
export class RollStates {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  @Index({unique: true})
  name: string
}
