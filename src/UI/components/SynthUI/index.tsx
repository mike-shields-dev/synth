import { ReactNode, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

function SynthUI({ children }: Props) {  
  return (
    <div>
      <form
        aria-label="synth controls"
      >
        { children }
      </form>
    </div>
  )
}

export { SynthUI };
