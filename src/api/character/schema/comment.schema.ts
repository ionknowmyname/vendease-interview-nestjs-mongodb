import { Injectable } from '@nestjs/common';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';



@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Comment {
  @Prop({ type: String })
  comment: string;

  @Prop({ type: String })
  ip_address_location: string;

}

export type CommentDocument = Document & Comment;
export const CommentSchema = SchemaFactory.createForClass(Comment);
