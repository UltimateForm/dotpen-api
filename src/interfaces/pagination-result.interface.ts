import { IPagination } from "./pagination.interface";

export interface IPaginationResult extends IPagination {
  count: number;
}
