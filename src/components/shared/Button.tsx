import type { ComponentPropsWithoutRef } from "react";

import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "ghost";

type ButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
};

const LETTER_STAGGER_S = 0.015;

// A link styled as a button: primary is a white pill, ghost is outlined. A text label rolls letter by letter on hover.
export function Button({ variant = "primary", className, children, ...anchorProps }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(" ");
  if (typeof children !== "string") {
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <a aria-label={children} {...anchorProps} className={classes}>
      <RollingLabel text={children} />
    </a>
  );
}

// Two copies of the label: on hover the first rolls up out of view while the second rolls in from below.
function RollingLabel({ text }: { text: string }) {
  const letters = [...text];
  return (
    <span className={styles.label} aria-hidden="true">
      <Letters letters={letters} className={styles.outgoing} />
      <Letters letters={letters} className={styles.incoming} />
    </span>
  );
}

function Letters({ letters, className }: { letters: string[]; className: string }) {
  return (
    <span className={className}>
      {letters.map((letter, position) => (
        <span key={position} className={styles.letter} style={{ transitionDelay: `${position * LETTER_STAGGER_S}s` }}>
          {letter}
        </span>
      ))}
    </span>
  );
}
