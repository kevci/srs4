import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { Card } from '../cards/card.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.decks)
  user: User;

  @OneToMany(type => Card, card => card.deck)
  cards: Card[];

  @Column('text')
  name: string;

  @Column('int')
  cardsCount: number;
}