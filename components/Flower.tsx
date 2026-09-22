type FlowerProps = {
  className?: string;
  onClick?: () => void;
  label?: string;
  bloom?: boolean;
};

export default function Flower({ className = "", onClick, label, bloom = true }: FlowerProps) {
  const graphic = (
    <svg className="flower-svg" viewBox="0 0 180 260" aria-hidden="true">
      <path className="stem" d="M91 250 C91 202 90 150 90 105" />
      <path className="leaf leaf-left" d="M90 190 C72 168 50 169 42 181 C55 197 76 201 90 194Z" />
      <path className="leaf leaf-right" d="M91 161 C111 140 133 142 143 154 C128 171 107 174 91 168Z" />
      <g className={bloom ? "petals is-open" : "petals"}>
        <g transform="rotate(0 90 72)"><path className="petal" d="M90 71 C68 51 70 19 90 13 C110 19 112 51 90 71Z" /></g>
        <g transform="rotate(60 90 72)"><path className="petal" d="M90 71 C68 51 70 19 90 13 C110 19 112 51 90 71Z" /></g>
        <g transform="rotate(120 90 72)"><path className="petal" d="M90 71 C68 51 70 19 90 13 C110 19 112 51 90 71Z" /></g>
        <g transform="rotate(180 90 72)"><path className="petal" d="M90 71 C68 51 70 19 90 13 C110 19 112 51 90 71Z" /></g>
        <g transform="rotate(240 90 72)"><path className="petal" d="M90 71 C68 51 70 19 90 13 C110 19 112 51 90 71Z" /></g>
        <g transform="rotate(300 90 72)"><path className="petal" d="M90 71 C68 51 70 19 90 13 C110 19 112 51 90 71Z" /></g>
        <circle className="flower-center" cx="90" cy="72" r="17" />
        <circle className="flower-highlight" cx="84" cy="66" r="4" />
      </g>
    </svg>
  );

  if (onClick) {
    return <button className={`flower ${className}`} onClick={onClick} aria-label={label}>{graphic}</button>;
  }
  return <div className={`flower ${className}`}>{graphic}</div>;
}
