import { useState } from 'react';
import type { Card, CardStatus, Column } from '../types';
import { initialColumns } from '../data/initialData';

export const useKanban = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  // 1. Add card to a column
  const addCard = (columnId: CardStatus, title: string): void => {
    if (!title.trim()) return;

    const newCard: Card = {
      id: crypto.randomUUID(),
      title: title.trim(),
      status: columnId,
    };

    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    );
  };

  // 2. Move card left or right
  const moveCard = (cardId: string, direction: 'left' | 'right'): void => {
    // find current column index
    const currentColIndex = columns.findIndex(col =>
      col.cards.some(card => card.id === cardId)
    );

    const targetColIndex = direction === 'left'
      ? currentColIndex - 1
      : currentColIndex + 1;

    // guard — cant move outside bounds
    if (targetColIndex < 0 || targetColIndex >= columns.length) return;

    const card = columns[currentColIndex].cards.find(c => c.id === cardId)!;
    const targetColumnId = columns[targetColIndex].id;

    // update card status + move to target column
    const updatedCard: Card = { ...card, status: targetColumnId };

    setColumns(prev =>
      prev.map((col, index) => {
        if (index === currentColIndex) {
          // remove from current column
          return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
        }
        if (index === targetColIndex) {
          // add to target column
          return { ...col, cards: [...col.cards, updatedCard] };
        }
        return col;
      })
    );
  };

  // 3. Delete card
  const deleteCard = (cardId: string, columnId: CardStatus): void => {
    setColumns(prev =>
      prev.map(col =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter(c => c.id !== cardId) }
          : col
      )
    );
  };

  return { columns, addCard, moveCard, deleteCard };
};