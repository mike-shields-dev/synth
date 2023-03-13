import { ReactNode, useState } from "react";
import css from './index.module.css'; 

interface Props {
  children?: React.ReactNode;
}

function SynthUI({ children }: Props) {  
  return (
    <div className={css.SynthUI}>
      <form
        aria-label="synth controls"
      >
        { children }
      </form>
    </div>
  )
}

export { SynthUI };
