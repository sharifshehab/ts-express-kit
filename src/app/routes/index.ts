import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";

export const routes = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes
  },
]

moduleRoutes.forEach((route) => {
  routes.use(route.path, route.route)
})