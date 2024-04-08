import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { CharacterCreateDto } from './dtos';
import { Character, CharacterDocument } from './schema/character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name)
    private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async createCharacter(dto: CharacterCreateDto): Promise<Character> {
    // throw error if character already exists

    const toCreate = {
      first_name: dto.first_name,
      last_name: dto.last_name,
      status: dto.status,
      gender: dto.gender,
      state_of_origin: dto.state_of_origin,
    };

    if (dto.location) {
      // find location by longitude & latitude, if exists, add the location entity to toCreate
      // if location entity is not found, do nothing
    }

    if (dto.episode_codes.length > 0) {
      // cycle through episode codes list, for each episode code, find in episode in DB,
      // add list of found episodes entities to toCreate
    }

    let data: any;
    try {
      data = await this.characterModel.create(toCreate);
    } catch (err) {
      console.log('Error biko --> ' + err);
      throw new BadRequestException('Character Creation Failed');
    }

    return data;
  }

  async getAllCharacters(filterQuery: FilterQuery<CharacterDocument>) {
    
    const sortBy = filterQuery.sortBy; // name / gender
    const sortParameter = filterQuery.sort === 'desc' ? -1 : 1;
    const filterBy = filterQuery.filterBy; // gender / status / location
    const filterParameter = filterQuery.filterParameter;

    const aggregateQuery: any = [];

    if (filterBy) {
      switch (filterBy) {
        case 'gender':
          aggregateQuery.push({
            $match: { gender: filterParameter.toUpperCase() },
          });
          break;
        case 'status':
          aggregateQuery.push({
            $match: { status: filterParameter.toUpperCase() },
          });
          break;
        case 'location':
          aggregateQuery.push(
            {
              $match: { 'location.name': filterParameter },
            },
            {
              $lookup: {
                from: 'location',
                localField: 'location',
                foreignField: '_id',
                as: 'location',
              },
            },
            {
              $unwind: '$location',
            },
          );
          break;
        default:
          // do nothing
          break;
      }
    }

    if (sortBy) {
      if (sortBy === 'name') {
        aggregateQuery.push({
          $sort: { first_name: sortParameter },
        });
      }

      if (sortBy === 'gender') {
        aggregateQuery.push({
          $sort: { gender: sortParameter },
        });
      }
    }

    const data = await this.characterModel.aggregate(aggregateQuery); // .exec();

    return { data };
  }
}
