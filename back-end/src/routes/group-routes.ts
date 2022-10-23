import { GroupController } from "../controller/group-controller";

export const GroupRoutes = [
    {
        method: "get",
        route: "/groups",
        controller: GroupController,
        action: "allGroups",
      },
      {
        method: "get",
        route: "/groups/:id/students",
        controller: GroupController,
        action: "getGroupStudents",
      },
      {
        method: "post",
        route: "/groups/",
        controller: GroupController,
        action: "createGroup",
      },
      {
        method: "put",
        route: "/groups/:id",
        controller: GroupController,
        action: "updateGroup",
      },
      {
        method: "delete",
        route: "/groups/:id",
        controller: GroupController,
        action: "removeGroup",
      },
      {
        method: "post",
        route: "/groups/run-group-filters",
        controller: GroupController,
        action: "runGroupFilters"
      }
]