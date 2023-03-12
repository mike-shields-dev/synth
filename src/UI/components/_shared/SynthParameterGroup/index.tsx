import { useRef, ReactNode } from "react";
import css from './index.module.css';
import { camelCaseToTitleCase } from "../../../../utils/camelCaseToTitleCase";

interface Props {
  children: (isFocused: boolean) => ReactNode;
  group: string;
  isFocused: boolean;
  updateFocus: (id: string) => void;
}

function SynthParameterGroup({
  children,
  group,
  isFocused,
  updateFocus,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <section
      className={`
        ${css.SynthParameterGroup}
        ${css[`SynthParameterGroup${isFocused ? "--focus" : ""}`]}`
      }
        aria-label={camelCaseToTitleCase(group)}
        id={group}
        onFocus={(e) => updateFocus(e.currentTarget.id)}
        onClick={(e => updateFocus(e.currentTarget.id))}
        ref={formRef}
      >
        <header>
          <h2>{camelCaseToTitleCase(group)}</h2>
        </header>
        { children && children(isFocused) }
      </section>
  )
}

export { SynthParameterGroup };
  