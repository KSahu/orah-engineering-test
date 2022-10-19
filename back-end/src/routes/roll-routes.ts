import { RollController } from "../controller/roll-controller"

export const RollRoutes = [
  {
    method: "get",
    route: "/roll/get-all",
    controller: RollController,
    action: "allRolls",
  },
  {
    method: "get",
    route: "/roll/get-by-id",
    controller: RollController,
    action: "getRoll",
  },
  {
    method: "post",
    route: "/roll/create",
    controller: RollController,
    action: "createRoll",
  },
  {
    method: "put",
    route: "/roll/update",
    controller: RollController,
    action: "updateRoll",
  },
  {
    method: "delete",
    route: "/roll/delete",
    controller: RollController,
    action: "removeRoll",
  },
  {
    method: "post",
    route: "/roll/add-student-states",
    controller: RollController,
    action: "addStudentRollStates",
  },
  {
    method: "post",
    route: "/roll/add-student-roll-state",
    controller: RollController,
    action: "addStudentRollState",
  },
  {
    method: "put",
    route: "/roll/update-student-roll-state",
    controller: RollController,
    action: "updateStudentRollState",
  }
]
