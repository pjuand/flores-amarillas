"use client";

type Content = { name: string; messages: string[]; letter: string };
type Props = { content: Content; onChange: (content: Content) => void; onMusic: (file: File | null) => void };

export default function CustomizationPanel({ content, onChange, onMusic }: Props) {
  function changeMessage(index: number, value: string) {
    const messages = [...content.messages]; messages[index] = value; onChange({ ...content, messages });
  }
  return <details className="customization"><summary>Personalizar</summary><div className="customization-form">
    <label>Nombre<input value={content.name} onChange={(event) => onChange({ ...content, name: event.target.value })} placeholder="Su nombre" /></label>
    {content.messages.map((message, index) => <label key={index}>Mensaje de la flor {index + 1}<textarea value={message} onChange={(event) => changeMessage(index, event.target.value)} rows={2} /></label>)}
    <label>Carta final<textarea value={content.letter} onChange={(event) => onChange({ ...content, letter: event.target.value })} rows={7} /></label>
    <label>Canción (MP3)<input type="file" accept="audio/mpeg,audio/mp3" onChange={(event) => onMusic(event.target.files?.[0] ?? null)} /></label>
    <p>Los textos se guardan en este navegador. Para que la canción quede incluida al publicar, copia el archivo como <code>public/music.mp3</code>.</p>
  </div></details>;
}
