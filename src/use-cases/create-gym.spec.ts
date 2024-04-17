import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("Should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -16.4560896,
      longitude: -54.624256,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
