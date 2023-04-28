import css from './Nav.module.css';

interface Props {
    focus: string;
    updateFocus: (id: string) => void;
}

function Nav({ focus, updateFocus }: Props) {
    function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
        const id = e.currentTarget.dataset.focus_id;
        
        updateFocus(id || "");
    }

    const links = [
        { id: "oscillator", displayName: "Oscillator" },
        { id: "filter", displayName: "Filter" },
        { id: "filterEnvelope", displayName: "Filter Env" },
        { id: "ampEnvelope", displayName: "Amp Env" },
    ]

    return (
        <nav className={css.Nav}>
            {
                links.map(({ id, displayName }) =>
                    <a
                        className={css[focus === id ? "active" : ""]}
                        key={`nav-${id}-anchor`}
                        onClick={onClick}
                        data-focus_id={id}
                        href={`#${id}`}
                        aria-label={`Go to ${id} section`}
                    >
                        {displayName}
                    </a>
            )}
        </nav>
    )
}

export default Nav;
