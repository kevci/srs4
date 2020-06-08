import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Deck } from '../decks/deck.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.cards)
  user: User;

  @ManyToOne(type => Deck, deck => deck.cards)
  deck: Deck;

  @Column('text')
  front: string;

  @Column('back')
  back: string;

  @Column('float')
  e_factor: number;

  @Column('date')
  date_last_studied: Date;
}