import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function SynthUI({ children }: Props) {
  return (
    <form aria-label="synth user interface">
      { children }
    </form>
  )
}

export { SynthUI };
