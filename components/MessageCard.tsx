type Props = { message: string; number: number; onClose: () => void };

export default function MessageCard({ message, number, onClose }: Props) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="message-card" role="dialog" aria-modal="true" aria-labelledby="message-title" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Cerrar mensaje">×</button>
        <span className="card-flower" aria-hidden="true" />
        <p id="message-title">{message}</p>
        <span className="card-count">Flor {number} de 5</span>
      </section>
    </div>
  );
}
