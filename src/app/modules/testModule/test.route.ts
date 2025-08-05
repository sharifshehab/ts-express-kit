import express from "express";
import TestController from "./test.controller";
const router = express.Router();

router.get("/test", TestController.getTests);


export const TestRoutes = router;