import { IsNumber } from "class-validator";

export class RateRestaurantDto {
  @IsNumber()
  rate: number;

  restaurantId: number;
}
