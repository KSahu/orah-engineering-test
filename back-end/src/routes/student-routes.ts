import { StudentController } from "../controller/student-controller"

export const StudentRoutes = [
  {
    method: "get",
    route: "/student/get-all",
    controller: StudentController,
    action: "allStudents",
  },
  {
    method: "get",
    route: "/student/get-by-id",
    controller: StudentController,
    action: "getStudent",
  },
  {
    method: "post",
    route: "/student/create",
    controller: StudentController,
    action: "createStudent",
  },
  {
    method: "put",
    route: "/student/update",
    controller: StudentController,
    action: "updateStudent",
  },
  {
    method: "delete",
    route: "/student/delete",
    controller: StudentController,
    action: "removeStudent",
  }
]
