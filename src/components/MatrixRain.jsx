import React, { useEffect, useState } from 'react';

const MatrixRain = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const chars = '0123456789ABCDEF@#$%^&*(){}[]<>?';
    const createColumns = () => {
      const numColumns = Math.max(1, Math.floor(window.innerWidth / 20));

      setColumns(Array.from({ length: numColumns }, (_, i) => ({
        id: i,
        left: `${(i * 100) / numColumns}%`,
        animationDuration: `${8 + Math.random() * 8}s`,
        animationDelay: `${Math.random() * -10}s`,
        chars: Array.from({ length: 30 + Math.floor(Math.random() * 30) }, () =>
          chars[Math.floor(Math.random() * chars.length)]
        ),
      })));
    };

    createColumns();
    window.addEventListener('resize', createColumns);
    return () => window.removeEventListener('resize', createColumns);
  }, []);

  return (
    <div className="matrix-bg">
      {columns.map((col) => (
        <div
          key={col.id}
          className="matrix-column"
          style={{
            left: col.left,
            animationDuration: col.animationDuration,
            animationDelay: col.animationDelay,
          }}
        >
          {col.chars.map((char, index) => (
            <span key={`${col.id}-${index}`}>{char}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
