import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby Gym (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it("should be able to list nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app);

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
        latitude: -16.8560896,
        longitude: -44.824256,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({ latitude: -16.4560896, longitude: -54.624256 })
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
