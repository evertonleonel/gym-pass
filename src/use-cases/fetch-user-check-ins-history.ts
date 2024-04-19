import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface FetchUserCheckinsUseCaseRequest {
  userId: string;
  page: number;
}
interface FetchUserCheckinsUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckinsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckinsUseCaseRequest): Promise<FetchUserCheckinsUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns,
    };
  }
}
