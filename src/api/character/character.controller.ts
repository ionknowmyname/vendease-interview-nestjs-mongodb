import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { IResponse } from 'src/interfaces/response.interface';
import { CharacterCreateDto } from './dtos';
import { CharacterProvider } from './character.provider';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterProvider: CharacterProvider) {}

  @Post('create')
  async createCharacter(@Body() dto: CharacterCreateDto): Promise<IResponse> {
    return this.characterProvider.createCharacter(dto);
  }

  @Get('all')
  async getAllCharacters(@Query() query: any) {
    const data = await this.characterProvider.getAllCharacters(query);
    return data;
  }
}
