import { AutoMap } from "@automapper/classes";
import {
  CharacterRelationLevel,
  CharacterRelationType,
} from "@dotpen/common/models";
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsOptional,
  IsString,
} from "class-validator";

export class CharacterRelationPutModel {
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @IsArray()
  @IsString({ each: true })
  @AutoMap(() => [String])
  ids: [string, string];
  @AutoMap()
  relation: CharacterRelationType;
  @AutoMap()
  @IsOptional()
  spark?: string;
  @AutoMap()
  level: CharacterRelationLevel;
}
