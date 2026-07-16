import { Injectable } from "@nestjs/common";
import { RestaurantRepository } from "./repositories/restaurant.repository";

@Injectable()
export class RestaurantService {

  constructor(private readonly restaurant_repo: RestaurantRepository) { }

  search(name?: string, address?: string) {
    return this.restaurant_repo.search(name, address);
  }

  findByOwner(owner_id: number) {
    return this.restaurant_repo.findByOwnerID(owner_id);
  }
}
