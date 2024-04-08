import { HttpStatus, Injectable } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterCreateDto } from './dtos';
import { IResponse } from 'src/interfaces/response.interface';

@Injectable()
export class CharacterProvider {
  constructor(private readonly characterService: CharacterService) {}

  async createCharacter(dto: CharacterCreateDto): Promise<IResponse> {
    const data = await this.characterService.createCharacter(dto);

    return {
      status: HttpStatus.CREATED.toString(),
      message: 'Character created successfully',
      data,
    };
  }

  async getAllCharacters(query: any): Promise<IResponse> {
    let _query: any = { ...query };

    /* const paginationQuery: PaginationQuery = {};
    if (_query.page) {
      paginationQuery.page = Number(_query.page);
      delete _query.page;
    } else {
      paginationQuery.page = Number(1);
    }

    if (_query.limit) {
      paginationQuery.limit = Number(_query.limit);
      delete _query.limit;
    } else {
      paginationQuery.limit = Number(10);
    }

    if (_query.status) {
      _query.status = Number(_query.status);
    } */

    const { count, totalPages, data } =
      await this.characterService.getAllCharacters(_query);

    return {
      status: HttpStatus.OK.toString(),
      message: 'Characters successfully retrieved',
      data: data,
      // meta: {
      //   count,
      //   totalPages,
      // },
    };
  }

  // async getTicketById(userId: string, ticket_id: string): Promise<IResponse> {
  //   const data = await this.ticketsService.getTicketByFilterQuery({
  //     _id: ticket_id,
  //     initiator: new mongoose.Types.ObjectId(userId),
  //   });

  //   if (isEmpty(data)) {
  //     return {
  //       status: 'success',
  //       message: 'Ticket retrieved successfully',
  //       data: [],
  //     };
  //   }

  //   return {
  //     status: 'success',
  //     message: 'Ticket retrieved successfully',
  //     data,
  //   };
  // }
}
