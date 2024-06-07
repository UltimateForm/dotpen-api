import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CharacterModel,
  CharacterOperationModel,
  CharacterRelationOperationModel,
  CharacterRelationsResponseModel,
  CharactersResponseModel,
} from "./models/response";
import {
  CharacterCreateArgs,
  CharacterFindArgs,
  // the below is being triggered for no reason
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  CharacterPutRelationArgs,
  CharacterRelationFindArgs,
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
  getCharacterById(
    @Args() characterArgs: CharacterFindArgs,
  ): Promise<CharacterModel> {
    return this.service.getCharacterById(characterArgs);
  }

  @Query(() => CharactersResponseModel)
  getCharacters(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<CharactersResponseModel> {
    return this.service.getCharacters(paginationArgs);
  }

  @Mutation(() => CharacterOperationModel)
  createCharacter(
    @Args() characterCreateArgs: CharacterCreateArgs,
  ): Promise<CharacterOperationModel> {
    return this.service.createCharacter(characterCreateArgs);
  }

  @Mutation(() => CharacterOperationModel)
  deleteCharacterById(
    @Args() characterFindArgs: CharacterFindArgs,
  ): Promise<CharacterOperationModel> {
    return this.service.deleteCharacterById(characterFindArgs);
  }

  @Mutation(() => CharacterOperationModel)
  updateCharacter(
    @Args() characterUpdateArgs: CharacterUpdateArgs,
  ): Promise<CharacterOperationModel> {
    return this.service.updateCharacterById(characterUpdateArgs);
  }

  @Mutation(() => CharacterRelationOperationModel)
  putCharacterRelation(
    @Args() characterPutRelationArgs: CharacterPutRelationArgs,
  ): Promise<CharacterRelationOperationModel> {
    return this.service.putCharacterRelation(characterPutRelationArgs);
  }

  @Mutation(() => CharacterRelationOperationModel)
  deleteCharacterRelation(
    @Args() characterRelationFindArgs: CharacterRelationFindArgs,
  ): Promise<CharacterRelationOperationModel> {
    return this.service.deleteCharacterRelation(characterRelationFindArgs);
  }

  @Query(() => CharacterRelationsResponseModel)
  getRelations(
    @Args() findArgs: CharacterRelationFindArgs,
  ): Promise<CharacterRelationsResponseModel> {
    return this.service.getRelations(findArgs);
  }
}
