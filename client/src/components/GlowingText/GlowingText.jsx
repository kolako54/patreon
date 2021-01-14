import React from 'react';
import classes from './GlowingText.module.css';

const GlowingText = ({ children, glowOnHover = false }) => {
  const glowOnHoverClass = glowOnHover ? classes['--with-hover-glow'] : '';
  return (
    <span className={`${classes['glowing-text']} ${glowOnHoverClass}`}>
      {children}
    </span>
  );
};

export default GlowingText;
