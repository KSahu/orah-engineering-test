import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

import { CreateOrUpdateGroupBodySchema } from "./group-validation";
import { ValidationService } from "../services/validations.service";
import { Group } from "../entity/group.entity";
import { RollStates } from "../entity/roll-states.entity";
import { CreateGroupInput } from "../interface/group.interface";

export class GroupController {

  private groupRepository = getRepository(Group);
  private groupStatesRepository = getRepository(RollStates);

  async allGroups(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    return this.groupRepository.find({
      relations: [ 'roll_states'  ]
    });
  }

  async createGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    const { body: params } = request;
    const { error } = CreateOrUpdateGroupBodySchema.validate(params);
    if (error) {
      return ValidationService.onRequestValidationError(error, response);
    }

    const group = new Group();

    const updatedParams = await this.updateInputForGroupStatesEntiy(params);

    group.prepareToCreateOrUpdate(updatedParams);

    return this.groupRepository.save(group);

  }

  async updateGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 

    const groupId = request.params.id;
    const { body: params } = request;
    
    const { error } = CreateOrUpdateGroupBodySchema.validate(params);
    if (error) {
      return ValidationService.onRequestValidationError(error, response);
    }

    const group = await this.groupRepository.findOne(groupId, {
      relations: [ 'roll_states'  ]
    });

    if(!group) {
      response.status(404).send({ error: { message: `Group id: ${groupId} not found`}});
      return;
    }

    const updatedParams = await this.updateInputForGroupStatesEntiy(params);

    group.prepareToCreateOrUpdate(updatedParams);

    return this.groupRepository.save(group);

  }

  async removeGroup(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Delete a Group
    let groupToRemove = await this.groupRepository.findOne(request.params.id);
    if(!groupToRemove) {
      response.status(404).send({ error: { message: `Group id: ${request.params.id} not found`}});
      return;
    }
    await this.groupRepository.remove(groupToRemove);
    return true;
  }

  async getGroupStudents(request: Request, response: Response, next: NextFunction) {
    // Task 1: 
    
    // Return the list of Students that are in a Group

    const groupId = request.params.id;

    const group = await this.groupRepository.findOne(groupId, {
      relations: [ 'students'  ]
    });

    if(!group) {
      response.status(404).send({ error: { message: `Group id: ${groupId} not found`}});
      return;
    }

    return group.getStudents();

  }


  async runGroupFilters(request: Request, response: Response, next: NextFunction) {
    // Task 2:
  
    // 1. Clear out the groups (delete all the students from the groups)

    // 2. For each group, query the student rolls to see which students match the filter for the group

    // 3. Add the list of students that match the filter to the group
  }


  private async updateInputForGroupStatesEntiy(input: CreateGroupInput): Promise<CreateGroupInput> {
    for (let index = 0; index < input.roll_states.length; index++ ) {
      let rollState = await this.groupStatesRepository.findOne({ 'name': input.roll_states[index] as string });
      if(!rollState) {
        rollState  = new RollStates();
        rollState.name = input.roll_states[index] as string;
      }
      input.roll_states[index] = rollState;
    }
    return input;
  }
 
}
