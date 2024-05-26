import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CharacterModel,
  CharacterOperationModel,
  CharacterRelationAggregateModel,
} from "./models/response";
import {
  CharacterCreateArgs,
  CharacterFindArgs,
  CharacterPutRelationArgs,
  CharacterUpdateArgs,
  PaginationArgs,
} from "./models/args";
import { CharactersService } from "./characters.service";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Resolver()
export class CharactersResolver {
  static className = "CharactersResolver";
  constructor(
    private service: CharactersService,
    @InjectPinoLogger(CharactersResolver.className)
    private readonly logger: PinoLogger,
  ) {}

  @Query(() => CharacterModel)
  getCharacterById(@Args() characterArgs: CharacterFindArgs) {
    return this.service.getCharacterById(characterArgs);
  }

  @Query(() => [CharacterModel])
  getCharacters(@Args() paginationArgs: PaginationArgs) {
    return this.service.getCharacters(paginationArgs);
  }

  @Mutation(() => CharacterOperationModel)
  createCharacter(@Args() characterCreateArgs: CharacterCreateArgs) {
    return this.service.createCharacter(characterCreateArgs);
  }

  @Mutation(() => CharacterOperationModel)
  deleteCharacterById(@Args() characterFindArgs: CharacterFindArgs) {
    return this.service.deleteCharacterById(characterFindArgs);
  }

  @Mutation(() => CharacterOperationModel)
  updateCharacter(@Args() characterUpdateArgs: CharacterUpdateArgs) {
    return this.service.updateCharacterById(characterUpdateArgs);
  }

  @Mutation(() => CharacterRelationAggregateModel)
  putCharacterRelationship(
    @Args() CharacterPutRelationArgs: CharacterPutRelationArgs,
  ) {
    return this.service.putCharacterRelationship(CharacterPutRelationArgs);
  }
}
