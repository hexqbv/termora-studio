import React from 'react';

const TABLE_BORDERS = {
  single: {
    tl: '┌', tm: '┬', tr: '┐',
    ml: '├', mm: '┼', mr: '┤',
    bl: '└', bm: '┴', br: '┘',
    h: '─', v: '│'
  },
  double: {
    tl: '╔', tm: '╦', tr: '╗',
    ml: '╠', mm: '╬', mr: '╣',
    bl: '╚', bm: '╩', br: '╝',
    h: '═', v: '║'
  },
  compact: {
    tl: ' ', tm: ' ', tr: ' ',
    ml: '-', mm: '+', mr: '-',
    bl: ' ', bm: ' ', br: ' ',
    h: '-', v: ' '
  }
};

export function TableRenderer({ config }) {
  const {
    headers = ['Column 1', 'Column 2', 'Column 3'],
    rows = [
      ['Row 1-A', 'Row 1-B', 'Row 1-C'],
      ['Row 2-A', 'Row 2-B', 'Row 2-C']
    ],
    borderStyle = 'single'
  } = config;

  const b = TABLE_BORDERS[borderStyle] || TABLE_BORDERS.single;

  // Compute column widths
  const colCount = Math.max(headers.length, ...rows.map(r => r.length));
  const colWidths = Array.from({ length: colCount }, (_, colIdx) => {
    const headLen = (headers[colIdx] || '').length;
    const maxRowLen = Math.max(...rows.map(r => (r[colIdx] || '').length), 0);
    return Math.max(headLen, maxRowLen, 8) + 2; // +2 for padding
  });

  const makeRow = (cells, leftChar, midChar, rightChar, isHeader = false) => {
    const line = cells.map((cell, idx) => {
      const width = colWidths[idx] || 10;
      const val = ` ${cell || ''} `;
      return val + ' '.repeat(Math.max(0, width - val.length));
    }).join(midChar);

    return `${leftChar}${line}${rightChar}`;
  };

  const makeDivider = (leftChar, midChar, rightChar, fillChar) => {
    return leftChar + colWidths.map(w => fillChar.repeat(w)).join(midChar) + rightChar;
  };

  const topBorder = makeDivider(b.tl, b.tm, b.tr, b.h);
  const midDivider = makeDivider(b.ml, b.mm, b.mr, b.h);
  const bottomBorder = makeDivider(b.bl, b.bm, b.br, b.h);

  return (
    <div className="font-mono text-xs sm:text-sm whitespace-pre select-text leading-relaxed overflow-x-auto text-slate-300">
      <div className="text-slate-500">{topBorder}</div>
      <div className="text-cyan-400 font-bold">
        {makeRow(headers, b.v, b.v, b.v, true)}
      </div>
      <div className="text-slate-500">{midDivider}</div>
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="text-slate-200 hover:bg-dark-800/40">
          {makeRow(row, b.v, b.v, b.v)}
        </div>
      ))}
      <div className="text-slate-500">{bottomBorder}</div>
    </div>
  );
}
