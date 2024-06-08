import { BadRequestException } from "@nestjs/common";
import { CharacterRelationType } from "@charactersGraphql";

export function enforceRelationshipType(source: any) {
  const expectedTypes = Object.values(CharacterRelationType);
  if (!expectedTypes.includes(source)) {
    throw new BadRequestException("Invalid relationship type");
  }
}
