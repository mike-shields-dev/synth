import React from "react";

interface Props {
    groupName: string;
    children: React.ReactNode;
    handleFocus: React.FocusEventHandler;
}

function SynthParameterGroup({ groupName, handleFocus, children }: Props) {
  return (
    <section>
      <form aria-label={groupName} onFocus={handleFocus}>
        { children }
      </form>
    </section>
  )
}

export { SynthParameterGroup };
