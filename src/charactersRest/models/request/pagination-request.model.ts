import { IPagination } from "@dotpen/common/interfaces";
import { IsOptional } from "class-validator";

export class PaginationRequestModel implements IPagination {
  @IsOptional()
  pageNo: number = 0;
  @IsOptional()
  pageSize: number = 10;
}
