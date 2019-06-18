const pool = require('../data/config2');
const mysql = require(mysql);

<<<<<<< HEAD

function getMechP(userID){
  pool.query('SELECT * FROM (Collections natural join Items natural join MechanicalP) WHERE Collections.UserID = ?'), userID, (error, result) => {
    var frontend = result.map((item, i) => ({
      basicAtts:{
        itemName: item.MP_Name,
        itemId: item.MP_ID,
        manufacturer: item.MP_Manufacturer,
        type: item.type,
      },
      stats: {
        material: item.MP_Material,
        leadSize: item.MP_Lead_Size,
      }
    }));
  }
=======
function getMechP (userID){
  pool.query('SELECT * FROM (Collections natural join Items natural join MechanicalP) WHERE Collections.UserID = ?', userID, (error, result) => {
      frontend = result.map((item, i) => ({
          basicAtts: {
              itemName: item.MP_Name,
              itemId: item.MP_ID,
              manufacturer: item.MP_Manufacturer,
              type: item.type,
          },
          stats: {
              material: item.MP_Material,
              leadSize: item.MP_Lead_Size,
          }
      }));
    }
>>>>>>> 66f769e24979adbca29a32b7880c3f4bb7150a89
}
