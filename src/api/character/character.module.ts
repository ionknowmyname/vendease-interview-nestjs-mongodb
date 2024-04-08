import { Module } from '@nestjs/common';
import { Character, CharacterSchema } from './schema/character.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CharacterController } from './character.controller';
import { CharacterService } from './character.service';
import { CharacterProvider } from './character.provider';
import { Location, LocationSchema } from './schema/location.schema';
import { Episode, EpisodeSchema } from './schema/episode.schema';
import { Comment, CommentSchema } from './schema/comment.schema';

@Module({
  providers: [CharacterService, CharacterProvider],
  exports: [CharacterService],
  controllers: [CharacterController],
  imports: [
    // forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: Character.name,
        schema: CharacterSchema,
      },
      {
        name: Location.name,
        schema: LocationSchema,
      },
      {
        name: Episode.name,
        schema: EpisodeSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
})
export class CharacterModule {}
