import React from "react";

interface Props {
  children: React.ReactNode;
}

function Synth({ children}: Props) {
  return (
    <div data-testid="synth">
      { children }
    </div>
  )
}

export { Synth };
