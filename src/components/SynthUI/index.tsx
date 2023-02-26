import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function SynthUI({ children }: Props) {
  return (
    <div data-testid="SynthUI">
      { children }
    </div>
  )
}

export { SynthUI };
