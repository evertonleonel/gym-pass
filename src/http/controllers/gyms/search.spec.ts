import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it("should be able search gym by title", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .get("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Javascript Gym",
        description: "Some description",
        phone: "123456789",
        latitude: -16.4560896,
        longitude: -54.624256,
      });

    await request(app.server)
      .get("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Tpyscript Gym",
        description: "Some description",
        phone: "123456789",
        latitude: -16.4560896,
        longitude: -54.624256,
      });

    const response = await request(app.server)
      .get("/gyms/search")
      .query({ q: "Javascript" })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: "Javascript Gym",
      }),
    ]);
  });
});
