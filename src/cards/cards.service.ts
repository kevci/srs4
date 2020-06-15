import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository , LessThanOrEqual, Raw} from 'typeorm';

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
    const cards = await this.cardsRepository.find({
      where: {
        cur_interval: LessThanOrEqual(Raw('DATEDIFF(DAY, NOW(), date_last_studied'))
      },
      take: 50
    });
    if (cards) {
      return cards;
    } else throw new NotFoundException();
  }

  async updateCard(id: number, card: UpdateCardDto) {
    await this.cardsRepository.update(id, card);
    const updatedCard = await this.cardsRepository.findOne(id);
    if (updatedCard) {
      return updatedCard;
    } else throw new NotFoundException(id);
  }

  async handleCardAnswer(id: number, answer: HandleCardAnswerDto) {
    const card = await this.cardsRepository.findOne(id);
    const newEFactor = card.e_factor + (0.1 -(5 - answer.answer_confidence) 
      * (0.08 + (5 - answer.answer_confidence) * 0.02));
    const newInterval = Math.floor(card.cur_interval * newEFactor);

    card.e_factor = newEFactor;
    card.cur_interval = newInterval;
    card.date_last_studied = new Date(); //I don't know if this works right

    await this.cardsRepository.update(id, card);
    const updatedCard = await this.cardsRepository.findOne(id);
    if (updatedCard) {
      return updatedCard;
    } else throw new NotFoundException(id);
  }

  async deleteCard(id: number) {
    const response = await this.cardsRepository.delete(id);
    if (!response.affected) {
      throw new NotFoundException(id);
    }
  }
}