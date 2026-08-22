'use client';
import { useState } from 'react';
import { TreeNode as TreeNodeType } from '../types';
import styles from './FileExplorer.module.css';

type Props = {
  node: TreeNodeType;
}

export default function TreeNode({ node }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const isFolder = node.children !== undefined;

  return (
    <div className={styles.node}>

      {/* Row */}
      <div
        className={styles.row}
        onClick={() => isFolder && setIsOpen(prev => !prev)}
      >
        {/* Icon */}
        <span>
          {isFolder ? (isOpen ? '📂' : '📁') : '📄'}
        </span>

        {/* Name */}
        <span>{node.name}</span>
      </div>

      {/* Children — recursion happens here */}
      {isFolder && isOpen && (
        <div className={styles.children}>
          {node.children!.map(child => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}

    </div>
  );
}