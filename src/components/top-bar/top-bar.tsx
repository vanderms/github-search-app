interface Props {
  handleClick: () => void;
}

export default function TopBar({ handleClick }: Props) {
  return (
    <header className="nv-top-bar">
      <h1 className="logo">devfinder</h1>
      <button
        onClick={() => handleClick()}
        className="toggle-theme"
        aria-label="toggle theme"
      ></button>
    </header>
  );
}
