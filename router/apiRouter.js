const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.get("/settings", apiController.getSetting);
router.get("/builds", apiController.getBuilds);
router.get("/builds/:buildId", apiController.getBuildId);
router.get("/builds/:buildId/logs", apiController.getLogs);

router.post("/settings", express.json(), apiController.postSetting);
router.post("/builds/:commitHash",express.json(), apiController.postCommitHash);
module.exports = router;