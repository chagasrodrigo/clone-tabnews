test("GET to /api/v1/status returns status 200 and correct body", async () => {
  const response = await fetch("http://192.168.18.7:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  //Converter Data
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.dependencies.database).toEqual("16.0");

  expect(responseBody.dependencies.max_connections).toBeGreaterThan(0);
  //expect(responseBody.current_users).toBeGreaterThanOrEqual(0);

  console.log(responseBody);
});
