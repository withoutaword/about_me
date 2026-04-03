import React, { useEffect, useState } from 'react';

const MatrixRain = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const chars = '0123456789ABCDEF@#$%^&*(){}[]<>?';
    const numColumns = Math.floor(window.innerWidth / 15);
    
    const newColumns = Array.from({ length: numColumns }, (_, i) => ({
      id: i,
      left: `${(i * 100) / numColumns}%`,
      animationDuration: `${8 + Math.random() * 8}s`,
      animationDelay: `${Math.random() * 10}s`,
      chars: Array.from({ length: 30 + Math.floor(Math.random() * 30) }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('')
    }));
    
    setColumns(newColumns);
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
          {col.chars}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;
