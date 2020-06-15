import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateCardDto from './dto/createCard.dto';
import UpdateCardDto from './dto/updateCard.dto';
import HandleCardAnswerDto from './dto/handleCardAnswer.dto';
import { Card } from './card.entity';

@Injectable()
export default class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardsRepository: Repository<Card>,
  ) {}

  async createCard(card: CreateCardDto) {
    const newCard = await this.cardsRepository.create(card);
    await this.cardsRepository.save(newCard);
    return newCard;
  }

  async getCardsForLearningSession() {
    await this.cardsRepository.find({})
  }

  async updateCard(id: number, card: UpdateCardDto) {
    await this.cardsRepository.update(id, card);
    const updatedCard = await this.cardsRepository.findOne(id);
    if (updatedCard) {
      return updatedCard;
    }
    throw new NotFoundException(id);
  }

  async handleCardAnswer(id: number, answer: HandleCardAnswerDto) {
    
  }

  async deleteCard(id: number) {
    const response = await this.cardsRepository.delete(id);
    if (!response.affected) {
      throw new NotFoundException(id);
    }
  }
}