const { connectionPool } = require("../db/connection");
require("dotenv").config();

exports.movingData = async () => {
  const pool = connectionPool;
  try {
    pool.beginTransaction(function (err) {
      if (err) {
        throw err;
      }
      pool.query(
        `INSERT INTO ${process.env.DELETE_DB}.hk_transactions SELECT * from ${process.env.PRODUCTION_DB}.hk_transactions where is_deleted = 1;
         INSERT INTO ${process.env.DELETE_DB}.hk_savings_trx  SELECT * from ${process.env.PRODUCTION_DB}.hk_savings_trx where is_deleted = 1;
         INSERT INTO ${process.env.DELETE_DB}.hk_savings      SELECT * from ${process.env.PRODUCTION_DB}.hk_savings where is_deleted = 1;
         INSERT INTO ${process.env.DELETE_DB}.hk_events       SELECT * from ${process.env.PRODUCTION_DB}.hk_events where is_deleted = 1;
         INSERT INTO ${process.env.DELETE_DB}.hk_categories   SELECT * from ${process.env.PRODUCTION_DB}.hk_categories where is_deleted = 1;
         INSERT INTO ${process.env.DELETE_DB}.hk_budgets      SELECT * from ${process.env.PRODUCTION_DB}.hk_budgets where is_deleted = 1;
         INSERT INTO ${process.env.DELETE_DB}.hk_accounts     SELECT * from ${process.env.PRODUCTION_DB}.hk_accounts where is_deleted = 1;`,
        function (error, copyResult, fields) {
          if (error) {
            return pool.rollback(function () {
              throw error;
            });
          }
          if (copyResult) {
            pool.query(
              `DELETE from ${process.env.PRODUCTION_DB}.hk_transactions where is_deleted =1;
               DELETE from ${process.env.PRODUCTION_DB}.hk_savings_trx where is_deleted =1;
               DELETE from ${process.env.PRODUCTION_DB}.hk_savings where is_deleted =1;
               DELETE from ${process.env.PRODUCTION_DB}.hk_events where is_deleted =1;
               DELETE from ${process.env.PRODUCTION_DB}.hk_categories where is_deleted =1;
               DELETE from ${process.env.PRODUCTION_DB}.hk_budgets where is_deleted =1;
               DELETE from ${process.env.PRODUCTION_DB}.hk_accounts where is_deleted =1;`,
              function (error, deleteResults, fields) {
                if (error) {
                  return pool.rollback(function () {
                    throw error;
                  });
                }
                if (deleteResults) {
                  pool.commit(function (err) {
                    if (err) {
                      return pool.rollback(function () {
                        throw err;
                      });
                    }
                    console.log("success!");
                    // process.exit();
                  });
                }
              }
            );
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};
