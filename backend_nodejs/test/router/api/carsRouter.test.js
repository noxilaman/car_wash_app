const server = require("../../../index");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

describe("Base", () => {
  test("1 should equal 1", () => {
    expect(1).toBe(1);
  });
});

describe("Car Router", () => {
  it("Post /api/car create normal car", async () => {
    const res = await requestWithSupertest.post("/api/car").send({
        license_code: "test",
        city: "test",
        car_size_id:1,
        note: "test",
      });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("Post /api/car create car with blank license_code", async () => {
    const res = await requestWithSupertest.post("/api/car").send({
      license_code: "",
      city: "test",
      car_size_id: 1,
      note: "test",
    });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("Post /api/car create car with blank city", async () => {
    const res = await requestWithSupertest.post("/api/car").send({
      license_code: "test",
      city: "",
      car_size_id: 1,
      note: "test",
    });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("Post /api/car create car with blank car_size_id", async () => {
    const res = await requestWithSupertest.post("/api/car").send({
      license_code: "test",
      city: "test",
      car_size_id: "",
      note: "test",
    });
    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("Post /api/car create car with blank note", async () => {
    const res = await requestWithSupertest.post("/api/car").send({
      license_code: "test",
      city: "test",
      car_size_id: 1,
      note: "",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("GET /api/car Get all car", async () => {
    const res = await requestWithSupertest.get("/api/car");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
  });

  it("GET /api/car/:id Get one car", async () => {
    const res = await requestWithSupertest.get("/api/car/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("car_size_id");
  });

  it("GET /api/car/:id Get blank car", async () => {
    const res = await requestWithSupertest.get("/api/car/0");
    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("message");
  });

  it("Put /api/car/:id Update new license_code Car ", async () => {
    const res = await requestWithSupertest.put("/api/car/1").send({
      license_code: "test2",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("message");
  });

  it("Put /api/car/:id Update blank license_code Car ", async () => {
    const res = await requestWithSupertest.put("/api/car/1").send({
      license_code: "",
    });
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("message");
  });

  it("Put /api/car/:id Update incorrect fields Car ", async () => {
    const res = await requestWithSupertest.put("/api/car/1").send({
      license_code2: "test3",
    });
    expect(res.status).toEqual(500);
    expect(res.type).toEqual(expect.stringContaining("json"));
    expect(res.body).toHaveProperty("message");
  });
  
});
