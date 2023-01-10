interface Props {
    name: string;
}

function SynthParameterGroup({ name }: Props) {
  return (
    <section>
      <form aria-label={name}></form>
    </section>
  )
}

export { SynthParameterGroup };
