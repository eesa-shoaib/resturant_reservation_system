import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CreateRestaurantDto } from "./actions/dto/create-restaurant.dto";
import { CreateRestaurantActionService } from "./actions/create-restaurant-action.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { RestaurantMapper } from "./mappers/restaurant.mapper";
import { RestaurantService } from "./restaurant.service";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller("restaurant")
export class RestaurantController {
  constructor(
    private readonly createRestaurant: CreateRestaurantActionService,
    private readonly restaurantService: RestaurantService
  ) { }

  @Post()
  @Roles('owner')
  create(@Body() dto: CreateRestaurantDto, @CurrentUser('id') owner_id: number) {
    return this.createRestaurant.execute(dto, owner_id)
  }

  @Get()
  async search(
    @Query('name') name?: string,
    @Query('address') address?: string,
  ) {
    const restaurants = await this.restaurantService.search(name, address);
    return RestaurantMapper.listToDto(restaurants);
  }

  @Get('my')
  @Roles('owner')
  async getMyRestaurants(@CurrentUser('id') owner_id: number) {
    const restaurants = await this.restaurantService.findByOwner(owner_id);
    return RestaurantMapper.listToDto(restaurants);
  }

}
