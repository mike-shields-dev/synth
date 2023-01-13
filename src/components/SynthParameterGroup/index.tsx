import React, { useRef } from "react";
import css from './index.module.css';

interface Props {
  groupName: string;
  children: React.ReactNode;
  updateFocus: (id: string) => void;
  isFocused: boolean;
}

function SynthParameterGroup({
  children,
  groupName,
  updateFocus,
  isFocused,
}: Props) {
  const form = useRef<HTMLFormElement>(null);

  function onFocus(e: React.FocusEvent) {
    updateFocus(e.currentTarget?.id);
  }

  function onClick(e: React.MouseEvent) {
    updateFocus(e.currentTarget.id);
  }

  return (
    <section>
      <form
        className={css[
          `SynthParameterGroup${isFocused
            ? "--focus"
            : ""
          }`
        ]}
        ref={form}
        aria-label={groupName}
        id={groupName}
        onFocus={onFocus}
        onClick={onClick}
      >
          { children }
      </form>
    </section>
  )
}

export { SynthParameterGroup };
