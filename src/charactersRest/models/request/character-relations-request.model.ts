import { AutoMap } from "@automapper/classes";
import { IPagination } from "@dotpen/common/interfaces";
import { CharacterRelationType } from "@dotpen/common/models";
import { ArrayMaxSize, IsArray, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CharacterRelationsRequestModel implements IPagination {
  @IsOptional()
  pageNo: number = 0;
  @IsOptional()
  pageSize: number = 10;
  @AutoMap(() => [String])
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  @IsString({ each: true })
  @Transform(({ value }) => value.split(","))
  ids?: string[];
  @AutoMap()
  @IsOptional()
  relation?: CharacterRelationType;
}
