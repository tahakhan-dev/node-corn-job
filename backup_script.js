const movingDataToDB = require("./backup/index.js");

var cron = require("node-cron");

// corn set to every sunday at 12 am
// cron.schedule("0 19 * * 0", () => {

// corn job at every 5 min
cron.schedule("*/5 * * * *", () => {
  (async () => {
    await movingDataToDB.movingData();
  })().catch((err) => {
    console.error(err);
  });
});
