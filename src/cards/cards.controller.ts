import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import CardsService from './cards.service';
import CreateCardDto from './dto/createCard.dto';
import UpdateCardDto from './dto/updateCard.dto';

@Controller('cards')
export default class CardsController {
  constructor(
    private readonly cardsService: CardsService
  ) {}

  @Get(':id')
  getCardById(@Param('id') id: string) {
    return this.cardsService.getCardById(Number(id));
  }

  @Get()
  getCardsForLearningSession() {
    return this.cardsService.getCardsForLearningSession();
  }

  @Post()
  async createCard(@Body() card: CreateCardDto) {
    return this.cardsService.createCard(card);
  }

  @Patch(':id')
  async updateCard(@Param('id') id: string, @Body() card: UpdateCardDto) {
    return this.cardsService.updateCard(Number(id), card);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    this.cardsService.deleteCard(Number(id));
  }
}