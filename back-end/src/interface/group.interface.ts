import { RollStates } from "../entity/roll-states.entity";

export interface CreateGroupInput {
  name: string;
  number_of_weeks: number;
  roll_states: string[] | RollStates[];
  incidents: number;
  ltmt: string;
}