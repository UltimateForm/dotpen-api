import { Args, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CharactersService } from "./characters.service";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";
import {
  CharModel,
  CharRelationModel,
  CharsListModel,
} from "./models/response";
import { CharsArgs } from "./models/args";

@Resolver(() => CharsListModel)
export class CharactersResolver {
  static className = "CharactersResolver";
  constructor(
    private service: CharactersService,
    @InjectPinoLogger(CharactersResolver.className)
    private readonly logger: PinoLogger,
  ) {}

  @Query(() => CharsListModel)
  async charsList(@Args() args: CharsArgs): Promise<CharsListModel> {
    return Promise.resolve({
      pageNo: args.pageNo,
      pageSize: args.pageSize,
    } as CharsListModel);
  }

  @ResolveField(() => [CharModel])
  async chars(@Parent() list: CharsListModel): Promise<CharModel[]> {
    return this.service.getCharacters({
      pageNo: list.pageNo,
      pageSize: list.pageSize,
    });
  }

  @ResolveField(() => [CharRelationModel])
  async relations(@Parent() char: CharModel): Promise<CharRelationModel[]> {
    return this.service.getRelations(char.id);
  }
}
