/*export LD_LIBRARY_PATH=/opt/oracle/instantclient_19_8
export OCI_LIB_DIR=/opt/oracle/instantclient_19_8
export OCI_INC_DIR=/opt/oracle/instantclient_19_8/sdk/include*/
//debugger;
const oracledb = require('oracledb');
const ejs=require('ejs');
debugger;
async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: 'citi_abagchi',
      password: 'U4ggPVAg9PNuJ',
      connectString: '100.112.45.151:1521/CITPDWTT'
    });

    const Account = await connection.execute(`SELECT ACCOUNT_HISTORY_FACT_KEY FROM PAYOR_DW.ALL_ACCOUNT_HISTORY_FACT`);
    const Benifit_plan = await connection.execute(`SELECT * FROM PAYOR_DW.ACCOUNT_PLAN_SELECT_FACT`);

    const rows = Account.rows;
    const options1

    const options = rows.map(row => {
       return { ACCOUNT_HISTORY_FACT_KEY: row[0]};  
   });
   const dropdownHtml = await ejs.renderFile('dropdown.ejs', { options });
    
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
