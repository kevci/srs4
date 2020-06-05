import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import DecksService from './decks.service';
import CreateDeckDto from './dto/createDeck.dto';
import UpdateDeckDto from './dto/updateDeck.dto';

@Controller('decks')
export default class DecksController {
  constructor(
    private readonly decksService: DecksService
  ) {}

  @Get(':id')
  getDeckById(@Param('id') id: string) {
    return this.decksService.getDeckById(Number(id));
  }

  @Post()
  async createDeck(@Body() deck: CreateDeckDto) {
    return this.decksService.createDeck(deck);
  }

  @Patch(':id')
  async updateDeck(@Param('id') id: string, @Body() deck: UpdateDeckDto) {
    return this.decksService.updateDeck(Number(id), deck);
  }

  @Delete(':id')
  async deleteDeck(@Param('id') id: string) {
    this.decksService.deleteDeck(Number(id));
  }
}
