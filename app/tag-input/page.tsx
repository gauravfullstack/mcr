'use client';

import { useState, type KeyboardEvent } from 'react';
import styles from './TagInput.module.css';

export default function TagInputPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const addTag = () => {
    const tag = input.trim();
    if (!tag || tags.includes(tag)) return;
    setTags((currentTags) => [...currentTags, tag]);
    setInput('');
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
    } else if (event.key === 'Backspace' && !input && tags.length > 0) {
      setTags((currentTags) => currentTags.slice(0, -1));
    }
  };

  return (
    <main className={styles.container}>
      <h1>Tag Input</h1>
      <div className={styles.tagInput}>
        {tags.map((tag) => (
          <span className={styles.tag} key={tag}>
            {tag}
            <button
              type="button"
              aria-label={`Remove ${tag}`}
              onClick={() =>
                setTags((currentTags) =>
                  currentTags.filter((currentTag) => currentTag !== tag),
                )
              }
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a tag and press Enter"
          aria-label="Add tag"
        />
      </div>
    </main>
  );
}
