import React from "react";

type Props = {
  name: string;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 20, className }: Props) {
  return (
    <svg width={size} height={size} className={className} aria-hidden="true">
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}
