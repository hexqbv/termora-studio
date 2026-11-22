import React from 'react';

// Box border character sets
const BORDER_STYLES = {
  round: {
    tl: '╭', tr: '╮', bl: '╰', br: '╯',
    h: '─', v: '│'
  },
  single: {
    tl: '┌', tr: '┐', bl: '└', br: '┘',
    h: '─', v: '│'
  },
  double: {
    tl: '╔', tr: '╗', bl: '╚', br: '╝',
    h: '═', v: '║'
  },
  heavy: {
    tl: '┏', tr: '┓', bl: '┗', br: '┛',
    h: '━', v: '┃'
  },
  classic: {
    tl: '+', tr: '+', bl: '+', br: '+',
    h: '-', v: '|'
  }
};

const COLOR_MAP = {
  cyan: 'text-cyan-400',
  emerald: 'text-emerald-400',
  green: 'text-green-400',
  yellow: 'text-amber-400',
  red: 'text-red-400',
  magenta: 'text-pink-400',
  blue: 'text-blue-400',
  white: 'text-slate-200',
  dim: 'text-slate-500'
};

export function BoxRenderer({ config }) {
  const {
    title = '',
    content = '',
    borderStyle = 'round',
    padding = 1,
    borderColor = 'cyan',
    titleAlignment = 'left'
  } = config;

  const borders = BORDER_STYLES[borderStyle] || BORDER_STYLES.round;
  const colorClass = COLOR_MAP[borderColor] || 'text-cyan-400';

  const contentLines = (content || '').split('\n');
  const maxLineLength = Math.max(...contentLines.map(l => l.length), title ? title.length + 4 : 20, 28);
  const innerWidth = maxLineLength + (padding * 2);

  // Build top border with optional title
  let topBorder = '';
  if (title) {
    const formattedTitle = ` ${title} `;
    if (titleAlignment === 'center') {
      const remaining = innerWidth - formattedTitle.length;
      const leftPad = Math.floor(remaining / 2);
      const rightPad = remaining - leftPad;
      topBorder = `${borders.tl}${borders.h.repeat(leftPad)}${formattedTitle}${borders.h.repeat(rightPad)}${borders.tr}`;
    } else {
      const rightPad = innerWidth - formattedTitle.length - 1;
      topBorder = `${borders.tl}${borders.h}${formattedTitle}${borders.h.repeat(Math.max(1, rightPad))}${borders.tr}`;
    }
  } else {
    topBorder = `${borders.tl}${borders.h.repeat(innerWidth)}${borders.tr}`;
  }

  const bottomBorder = `${borders.bl}${borders.h.repeat(innerWidth)}${borders.br}`;
  const emptyPaddingLine = `${borders.v}${' '.repeat(innerWidth)}${borders.v}`;

  return (
    <div className="font-mono text-sm leading-snug whitespace-pre select-text">
      {/* Top border */}
      <div className={colorClass}>{topBorder}</div>

      {/* Top padding */}
      {Array.from({ length: padding }).map((_, idx) => (
        <div key={`tp-${idx}`} className={colorClass}>{emptyPaddingLine}</div>
      ))}

      {/* Content lines */}
      {contentLines.map((line, idx) => {
        const trailingSpaces = innerWidth - (padding * 2) - line.length;
        return (
          <div key={`line-${idx}`} className="flex">
            <span className={colorClass}>{borders.v}</span>
            <span className="text-slate-200">
              {' '.repeat(padding)}
              {line}
              {' '.repeat(Math.max(0, trailingSpaces))}
              {' '.repeat(padding)}
            </span>
            <span className={colorClass}>{borders.v}</span>
          </div>
        );
      })}

      {/* Bottom padding */}
      {Array.from({ length: padding }).map((_, idx) => (
        <div key={`bp-${idx}`} className={colorClass}>{emptyPaddingLine}</div>
      ))}

      {/* Bottom border */}
      <div className={colorClass}>{bottomBorder}</div>
    </div>
  );
}
