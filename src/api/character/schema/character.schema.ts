import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';
import { GENDER, STATUS } from 'src/constants';
import { Episode } from './episode.schema';
import { Location } from './location.schema';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Character {
  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({
    default: STATUS.ACTIVE,
    type: String,
    enum: Object.values(STATUS),
  })
  status: STATUS;

  @Prop({
    default: GENDER.MALE,
    type: String,
    enum: Object.values(GENDER),
  })
  gender: GENDER;

  @Prop({ type: String })
  state_of_origin: string;

  @Prop({
    ref: Location.name,
    type: MongooseSchema.Types.ObjectId,
  })
  location: Location;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
  })
  episodes: Episode[];
}

export type CharacterDocument = Document & Character;
export const CharacterSchema = SchemaFactory.createForClass(Character);
