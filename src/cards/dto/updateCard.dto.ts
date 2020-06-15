//assume this is the only update dto format for now
export default class UpdateCardDto {
  id: number;
  front: string;
  back: string;
  date_last_studied: Date;
}