import { Injectable } from "@nestjs/common";
import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Restaurants } from "../entities/restaurant.entity";

@Injectable()
export class RestaurantRepository {

  constructor(@InjectRepository(Restaurants) private readonly repo: Repository<Restaurants>) { }

  create(data: DeepPartial<Restaurants>) {
    return this.repo.save(this.repo.create(data));
  }

  findAll() {
    return this.repo.find();
  }

  existsByNameAndAddress(name: string, address: string) {
    return this.repo.exists({ where: { name, address } });
  }

  findByID(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  search(name?: string, address?: string) {
    const where: any = {}
    if (name) where.name = name;
    if (address) where.address = address;
    return this.repo.find({ where });
  }

  findByOwnerID(owner_id: number) {
    return this.repo.find({ where: { owner: { id: owner_id } } });
  }

  // checkOpenTime() {

  // }

  // checkClosingTime() {

  // }
}
