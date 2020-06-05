import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CreateCardDto from './dto/createCard.dto';
//Do I need a separate Card interface?
import UpdateCardDto from './dto/updateCard.dto';

@Injectable()
export default class CardsService {


  getCardsForLearningSession() {
    
  }
}