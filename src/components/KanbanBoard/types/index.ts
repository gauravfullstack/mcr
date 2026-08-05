export type CardStatus = 'todo' | 'inprogress' | 'done';

export type Card = {
  id: string;
  title: string;
  status: CardStatus;
}

export type Column = {
  id: CardStatus;
  title: string;
  cards: Card[];
}