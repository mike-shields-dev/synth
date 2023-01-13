import React from "react";

interface Props {
  children: React.ReactNode;
}

function SynthUI({ children }: Props) {
  return (
    <div data-testid="SynthUI">
      { children }
    </div>
  )
}

export { SynthUI };
