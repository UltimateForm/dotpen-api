import { CharacterRelationType } from "@dotpen/charactersRepository";
import { BadRequestException } from "@nestjs/common";

export function enforceRelationshipType(source: any) {
  const expectedTypes = Object.values(CharacterRelationType);
  if (!expectedTypes.includes(source)) {
    throw new BadRequestException("Invalid relationship type");
  }
}
