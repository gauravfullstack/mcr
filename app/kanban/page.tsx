'use client';
import { useKanban } from './hooks/useKanban';
import Column from './components/Column';

export default function KanbanBoard() {
  const { columns, addCard, moveCard, deleteCard } = useKanban();

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>🗂️ Kanban Board</h1>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        {columns.map((col, index) => (
          <Column
            key={col.id}
            id={col.id}
            title={col.title}
            cards={col.cards}
            isFirst={index === 0}
            isLast={index === columns.length - 1}
            onAddCard={addCard}
            onMoveCard={moveCard}
            onDeleteCard={deleteCard}
          />
        ))}
      </div>
    </div>
  );
}