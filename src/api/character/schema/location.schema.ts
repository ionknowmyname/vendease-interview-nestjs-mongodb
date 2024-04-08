import { Injectable } from '@nestjs/common';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Schema as MongooseSchema, Document } from 'mongoose';


@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
})
export class Location {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  latitude: number;

  @Prop({ type: Number })
  longitude: number;
}

export type LocationDocument = Document & Location;
export const LocationSchema = SchemaFactory.createForClass(Location);
