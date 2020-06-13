import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Card } from '../cards/card.entity';
import { Deck } from '../decks/deck.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => Deck, deck => deck.user)
  decks: Deck[];

  @OneToMany(type => Card, card => card.user)
  cards: Card[];

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}