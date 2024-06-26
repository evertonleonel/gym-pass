import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("Should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Javascript Gym",
      description: null,
      phone: null,
      latitude: -16.4560896,
      longitude: -54.624256,
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -16.4560896,
      longitude: -54.624256,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ gym_id: "Javascript Gym" }),
    ]);
  });

  it("Should be able to fetch paginated gym search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -16.4560896,
        longitude: -54.624256,
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScriot",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ gym_id: "Javascript Gym 21" }),
      expect.objectContaining({ gym_id: "Javascript Gym 22" }),
    ]);
  });
});
