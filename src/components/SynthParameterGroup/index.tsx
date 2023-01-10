import React from "react";
import css from './index.module.css';

interface Props {
    groupName: string;
    children: React.ReactNode;
    handleFocus: React.FocusEventHandler;
}

function SynthParameterGroup({ groupName, handleFocus, children }: Props) {
  return (
    <section className={css.SynthParameterGroup}>
      <form
        aria-label={groupName}
        id={groupName}
        onFocus={handleFocus}
      >
          { children }
      </form>
    </section>
  )
}

export { SynthParameterGroup };
