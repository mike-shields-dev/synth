import { ReactNode, useState } from "react";
import css from "./index.module.css";

interface Props {
  children?: React.ReactNode;
}

function SynthUI({ children }: Props) {
  return (
    <form className={css.Synth_UI} aria-label="synth controls">
      {children}
    </form>
  );
}

export { SynthUI };
