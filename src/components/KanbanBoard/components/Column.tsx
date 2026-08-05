import { useState } from 'react';
import type { Card, CardStatus } from '../types';
import KanbanCard from './KanbanCard';

type Props = {
  id: CardStatus;
  title: string;
  cards: Card[];
  isFirst: boolean;
  isLast: boolean;
  onAddCard: (columnId: CardStatus, title: string) => void;
  onMoveCard: (cardId: string, direction: 'left' | 'right') => void;
  onDeleteCard: (cardId: string, columnId: CardStatus) => void;
}

export default function Column({
  id, title, cards,
  isFirst, isLast,
  onAddCard, onMoveCard, onDeleteCard
}: Props) {

  const [input, setInput] = useState<string>('');

  const handleAdd = (): void => {
    if (!input.trim()) return;
    onAddCard(id, input);
    setInput('');
  };

  return (
    <div style={{
      background: '#f5f5f5',
      borderRadius: '8px',
      padding: '16px',
      width: '280px',
      minHeight: '400px',
    }}>
      {/* Column Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
      }}>
        <h3 style={{ margin: 0, fontSize: '15px' }}>{title}</h3>
        <span style={{
          background: '#e0e0e0',
          borderRadius: '12px',
          padding: '2px 8px',
          fontSize: '13px',
        }}>
          {cards.length}
        </span>
      </div>

      {/* Cards */}
      {cards.length === 0 && (
        <p style={{ color: '#999', fontSize: '13px', textAlign: 'center' }}>
          No cards
        </p>
      )}

      {cards.map(card => (
        <KanbanCard
          key={card.id}
          card={card}
          isFirst={isFirst}
          isLast={isLast}
          onMove={onMoveCard}
          onDelete={onDeleteCard}
        />
      ))}

      {/* Add Card Input */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '6px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add a card..."
          style={{
            flex: 1,
            padding: '6px 8px',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
            fontSize: '13px',
          }}
        />
        <button onClick={handleAdd} style={{ padding: '6px 10px', cursor: 'pointer' }}>
          +
        </button>
      </div>
    </div>
  );
}