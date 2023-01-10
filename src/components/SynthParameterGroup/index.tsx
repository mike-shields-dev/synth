interface Props {
    groupName: string;
    children: React.ReactNode;
}

function SynthParameterGroup({ groupName, children }: Props) {
  return (
    <section>
      <form aria-label={groupName}>
        { children }
      </form>
    </section>
  )
}

export { SynthParameterGroup };
