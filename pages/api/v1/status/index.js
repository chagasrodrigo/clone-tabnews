import database from "../../../../infra/database.js";

async function status(request, response) {
  //const result = await database.query("SELECT 1 + 1 AS sum;");
  //console.log(result);
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB; // request.query.databaseName; //"local_db";
  console.log(`Banco de dados solicitado: ${databaseName}`);

  const databaseOpenedConnectionsResult = await database.query({
    //`SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = '${databaseName}';`,
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionResult = await database.query(
    "SHOW max_connections;",
  );

  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnectionResult.rows[0].max_connections,
  );

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;
  console.log(`Conexões abertas: ${databaseOpenedConnectionsValue}`);

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: databaseVersionValue,
      //current_users: res.rows[0].current_users,
      max_connections: parseInt(databaseMaxConnectionsValue),
    },
  });

  console.log(response.status);

  // server.js ou app.js
  if (!process.listenerCount("SIGTERM")) {
    process.on("SIGTERM", () => {
      console.log("Encerrando servidor…");
    });
  }
}

export default status;
