import { Injectable } from '@nestjs/common';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';
import { Character } from './character.schema';
import { Comment } from './comment.schema';


@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Episode {
  @Prop({ type: String })
  name: string;

  @Prop({
    type: String,
    unique: true,
  })
  episode_code: string;

  @Prop({
    type: Date,
    required: true,
  })
  release_date: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
  })
  characters: Character[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  })
  episode_comments: Comment[];
}

export type EpisodeDocument = Document & Episode;
export const EpisodeSchema = SchemaFactory.createForClass(Episode);
