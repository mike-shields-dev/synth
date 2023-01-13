import React, { useRef } from "react";
import css from './index.module.css';

interface Props {
  children: React.ReactNode;
  groupName: string;
  headerName: string;
  isFocused: boolean;
  updateFocus: (id: string) => void;
}

function SynthParameterGroup({
  children,
  headerName,
  groupName,
  isFocused,
  updateFocus,
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
        className={
          css[`SynthParameterGroup${
            isFocused ? "--focus" : ""
          }`
        ]}
        aria-label={groupName}
        id={groupName}
        onFocus={onFocus}
        onClick={onClick}
        ref={form}
      >
        <header>
          <h2>{headerName}</h2>
        </header>
          { children }
      </form>
    </section>
  )
}

export { SynthParameterGroup };
