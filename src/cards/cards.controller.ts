import { Body, Controller, Delete, Get, Param, Post, Put, Patch } from '@nestjs/common';
import CardsService from './cards.service';
import CreateCardDto from './dto/createCard.dto';
import UpdateCardDto from './dto/updateCard.dto';
import HandleCardAnswerDto from './dto/handleCardAnswer.dto';

@Controller('cards')
export default class CardsController {
  constructor(
    private readonly cardsService: CardsService
  ) {}

  @Get()
  getCardsForLearningSession() {
    return this.cardsService.getCardsForLearningSession();
  }

  @Post()
  async createCard(@Body() card: CreateCardDto) {
    return this.cardsService.createCard(card);
  }

  @Patch(':id') //this might make more sense as a PUT
  async updateCard(@Param('id') id: string, @Body() card: UpdateCardDto) {
    return this.cardsService.updateCard(Number(id), card);
  }

  @Patch(':id')
  async handleCardAnswer(@Param('id') id: string, @Body() answer: HandleCardAnswerDto) {
    return this.cardsService.handleCardAnswer(Number(id), answer);
  }

  @Delete(':id')
  async deleteCard(@Param('id') id: string) {
    this.cardsService.deleteCard(Number(id));
  }
}