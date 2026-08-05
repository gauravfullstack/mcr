import type { Card, CardStatus } from '../types';

type Props = {
  card: Card;
  isFirst: boolean;
  isLast: boolean;
  onMove: (cardId: string, direction: 'left' | 'right') => void;
  onDelete: (cardId: string, columnId: CardStatus) => void;
}

export default function KanbanCard({
  card, isFirst, isLast, onMove, onDelete
}: Props) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '6px',
      padding: '10px 12px',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
    }}>
      <span style={{ fontSize: '14px', flex: 1 }}>{card.title}</span>

      <div style={{ display: 'flex', gap: '4px' }}>
        {/* Move Left */}
        <button
          onClick={() => onMove(card.id, 'left')}
          disabled={isFirst}
          style={{ cursor: isFirst ? 'not-allowed' : 'pointer', opacity: isFirst ? 0.4 : 1 }}
        >
          ←
        </button>

        {/* Move Right */}
        <button
          onClick={() => onMove(card.id, 'right')}
          disabled={isLast}
          style={{ cursor: isLast ? 'not-allowed' : 'pointer', opacity: isLast ? 0.4 : 1 }}
        >
          →
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(card.id, card.status)}
          style={{ cursor: 'pointer', color: '#d32f2f' }}
        >
          🗑
        </button>
      </div>
    </div>
  );
}