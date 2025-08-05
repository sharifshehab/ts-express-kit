import express from "express";
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Test route is working");
});

const TestRoutes = router;
export default TestRoutes;