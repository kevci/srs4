import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateDeckDto from './dto/createDeck.dto';
import UpdateDeckNameDto from './dto/updateDeckName.dto';
import { Deck } from './deck.entity';

@Injectable()
export default class DecksService {
  constructor(
    @InjectRepository(Deck)
    private readonly decksRepository: Repository<Deck>,
  ) {}

  async getDeckById(id: number) {
    const deck = await this.decksRepository.findOne(id);
    if (deck) {
      return deck;
    }
    throw new NotFoundException(id);
  }

  async createDeck(deck: CreateDeckDto) {
    const newDeck = await this.decksRepository.create(deck);
    await this.decksRepository.save(newDeck);
    return newDeck;
  }

  async updateDeckName(id: number, deckName: UpdateDeckNameDto) {
    await this.decksRepository.update(id, deckName); //Need to figure out how this is supposed to work
    const updatedDeck = await this.decksRepository.findOne(id);
    if (updatedDeck) {
      return updatedDeck
    }
    throw new NotFoundException(id);
  }

  async deleteDeck(id: number) {
    const response = await this.decksRepository.delete(id);
    if (!response.affected) {
      throw new NotFoundException(id);
    }
  }
}