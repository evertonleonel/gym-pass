import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUseMetricsUseCase } from "../get-use-metrics";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUseMetricsUseCase(checkInsRepository);

  return useCase;
}
