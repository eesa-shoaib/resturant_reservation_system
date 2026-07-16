import { GetRestaurantDto } from "../dto/get-restaurant.dto";
import { Restaurants } from "../entities/restaurant.entity";

export class RestaurantMapper {

  static toDto(entity: Restaurants): GetRestaurantDto {

    return {
      name: entity.name,
      address: entity.address,
      closing_time: entity.closingTime,
      opening_time: entity.openingTime,
    }
  }

  static listToDto(entities: Restaurants[]): GetRestaurantDto[] {
    return entities.map(this.toDto);
  }

}
