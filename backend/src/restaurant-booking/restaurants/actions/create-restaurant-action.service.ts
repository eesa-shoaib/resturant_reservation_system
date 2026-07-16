import { BadRequestException, Injectable } from "@nestjs/common";
import { RestaurantRepository } from "../repositories/restaurant.repository";
import { CreateRestaurantDto } from "./dto/create-restaurant.dto";
import { ConflictException } from "@nestjs/common";

@Injectable()
export class CreateRestaurantActionService {

  constructor(private readonly restaurant_repo: RestaurantRepository) { }

  async execute(dto: CreateRestaurantDto, owner_id: number) {

    if (dto.opening_time >= dto.closing_time) {
      throw new BadRequestException("Closing time must be after Opening Time");
    }

    const exists = await this.restaurant_repo.existsByNameAndAddress(dto.name, dto.address);
    if (exists) throw new ConflictException("Email already registered");

    return this.restaurant_repo.create({
      name: dto.name,
      address: dto.address,
      openingTime: dto.opening_time,
      closingTime: dto.closing_time,
      owner: { id: owner_id } as any
    })
  }
}
