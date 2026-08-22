'use client';
import TreeNode from './Treenode';
import { initialData } from '../data/initialData';
import styles from './FileExplorer.module.css';

export default function FileExplorer() {
  return (
    <div className={styles.tree}>
      {initialData.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}