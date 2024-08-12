import { IPagination } from "@dotpen/interfaces";
import { IsOptional } from "class-validator";

export class PaginationRequestModel implements IPagination {
  @IsOptional()
  pageNo: number = 0;
  @IsOptional()
  pageSize: number = 10;
}
