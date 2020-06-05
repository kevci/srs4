export default class CreateCardDto {
  //might need to pass the user_id and deck_id here
  front: string;
  back: string;
  e_factor: number;
  date_last_studied: Date; //idk where this Date type comes from?
}