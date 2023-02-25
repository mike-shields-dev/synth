import React, { useRef } from "react";
import css from './index.module.css';

interface Props {
  children?: (isFocused: boolean) => JSX.Element;
  parameterGroup: string;
  headerName: string;
  isFocused: boolean;
  updateFocus: (id: string) => void;
}

function SynthParameterGroup({
  children,
  headerName,
  parameterGroup,
  isFocused,
  updateFocus,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section>
      <form
        className={
          css[`SynthParameterGroup${
            isFocused ? "--focus" : ""
          }`
        ]}
        aria-label={parameterGroup}
        id={parameterGroup}
        onFocus={(e) => updateFocus(e.currentTarget.id)}
        onClick={(e => updateFocus(e.currentTarget.id))}
        ref={formRef}
      >
        <header>
          <h2>{headerName}</h2>
        </header>
        { children && children(isFocused) }
      </form>
    </section>
  )
}

export { SynthParameterGroup };
