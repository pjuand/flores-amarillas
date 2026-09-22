"use client";

import { useState } from "react";
import Link from "next/link";
import { finalLetter, flowerMessages, recipientName } from "@/lib/content";
import { encodeContent } from "@/lib/share";

export default function PersonalizarPage() {
  const [name, setName] = useState(recipientName);
  const [messages, setMessages] = useState<string[]>([...flowerMessages]);
  const [letter, setLetter] = useState(finalLetter);
  const [musicUrl, setMusicUrl] = useState("/music.mp3");
  const [musicFile, setMusicFile] = useState<File | null>(null);

  const [savingCode, setSavingCode] = useState(false);
  const [uploadingMusic, setUploadingMusic] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [shareUrl, setShareUrl] = useState<string>("");

  function updateMessage(index: number, val: string) {
    const next = [...messages];
    next[index] = val;
    setMessages(next);
  }

  // 1. Guardar directo en lib/content.ts del proyecto
  async function handleSaveProject() {
    setSavingCode(true);
    setNotification(null);
    try {
      const res = await fetch("/api/customize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, messages, letter }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({
          type: "success",
          message: "¡Guardado con éxito en el proyecto! Cuando publiques tu app en Vercel, Netlify o GitHub, estos textos serán los predeterminados para cualquiera que entre al link principal.",
        });
      } else {
        throw new Error(data.error || "No se pudo guardar");
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err.message || "Error al guardar en el proyecto.",
      });
    } finally {
      setSavingCode(false);
    }
  }

  // 2. Subir archivo MP3 directo a public/music.mp3
  async function handleUploadMusic() {
    if (!musicFile) return;
    setUploadingMusic(true);
    setNotification(null);
    try {
      const formData = new FormData();
      formData.append("file", musicFile);
      const res = await fetch("/api/upload-music", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMusicUrl("/music.mp3");
        setNotification({
          type: "success",
          message: "¡Canción subida y guardada como public/music.mp3! Ya forma parte de tu proyecto para cuando lo publiques.",
        });
      } else {
        throw new Error(data.error || "Error al subir la canción");
      }
    } catch (err: any) {
      setNotification({
        type: "error",
        message: err.message || "Error al subir el archivo MP3.",
      });
    } finally {
      setUploadingMusic(false);
    }
  }

  // 3. Generar enlace compartible universal
  function handleGenerateShareLink() {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const encoded = encodeContent({
      name,
      messages,
      letter,
      music: musicUrl !== "/music.mp3" ? musicUrl : undefined,
    });
    const url = `${origin}/?d=${encoded}`;
    setShareUrl(url);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setNotification({
        type: "success",
        message: "¡Enlace copiado al portapapeles! Puedes enviárselo directamente a esa persona por WhatsApp o Instagram; funcionará en cualquier teléfono o navegador sin depender del tuyo.",
      });
    } else {
      setNotification({
        type: "success",
        message: "¡Enlace generado abajo! Cópialo y compártelo.",
      });
    }
  }

  return (
    <div className="personalizar-page">
      <div className="personalizar-card">
        <header className="personalizar-header">
          <Link href="/" className="back-link">
            ← Volver a la experiencia
          </Link>
          <h1>Panel de Personalización</h1>
          <p className="subtitle">
            Edita los textos, dedicatoria y música. Los cambios se guardarán en el proyecto para que quien abra la app los vea en su propio celular o navegador.
          </p>
        </header>

        {notification && (
          <div className={`notification-banner ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="personalizar-form">
          <fieldset>
            <legend>1. Destinatario</legend>
            <div className="field-group">
              <label htmlFor="name">Nombre de la persona especial:</label>
              <input
                id="name"
                type="text"
                placeholder="Ej. Sofía, Mi amor, Valeria..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span className="field-tip">
                Aparecerá en la pantalla inicial (&quot;Un pequeño regalo para...&quot;) y en la carta final.
              </span>
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Mensajes de las 5 Flores Amarillas</legend>
            <p className="fieldset-desc">
              Cada flor del ramo mostrará uno de estos mensajes cuando sea tocada:
            </p>
            {messages.map((msg, index) => (
              <div key={index} className="field-group">
                <label htmlFor={`flower-${index}`}>Flor {index + 1}:</label>
                <textarea
                  id={`flower-${index}`}
                  rows={2}
                  value={msg}
                  onChange={(e) => updateMessage(index, e.target.value)}
                />
              </div>
            ))}
          </fieldset>

          <fieldset>
            <legend>3. Carta Final</legend>
            <div className="field-group">
              <label htmlFor="letter">Dedicatoria completa (separa párrafos con una línea vacía):</label>
              <textarea
                id="letter"
                rows={8}
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>4. Música de fondo</legend>
            <div className="field-group">
              <label>Subir archivo MP3 al proyecto:</label>
              <div className="file-upload-row">
                <input
                  type="file"
                  accept="audio/mpeg,audio/mp3"
                  onChange={(e) => setMusicFile(e.target.files?.[0] || null)}
                />
                <button
                  type="button"
                  className="secondary-btn"
                  disabled={!musicFile || uploadingMusic}
                  onClick={handleUploadMusic}
                >
                  {uploadingMusic ? "Subiendo..." : "Guardar en public/music.mp3"}
                </button>
              </div>
              <span className="field-tip">
                Se guardará como <code>public/music.mp3</code> para que se reproduzca por defecto.
              </span>
            </div>

            <div className="field-group" style={{ marginTop: "14px" }}>
              <label htmlFor="musicUrl">O enlace directo a canción (URL externa opcional):</label>
              <input
                id="musicUrl"
                type="url"
                placeholder="https://ejemplo.com/cancion.mp3"
                value={musicUrl}
                onChange={(e) => setMusicUrl(e.target.value)}
              />
            </div>
          </fieldset>

          <div className="actions-section">
            <button
              type="button"
              className="primary-btn"
              disabled={savingCode}
              onClick={handleSaveProject}
            >
              {savingCode ? "Guardando en el proyecto..." : "💾 Guardar en el proyecto (para publicar)"}
            </button>

            <button
              type="button"
              className="accent-btn"
              onClick={handleGenerateShareLink}
            >
              🔗 Copiar enlace personalizado para regalar
            </button>

            <Link
              href={shareUrl ? shareUrl : "/"}
              target="_blank"
              className="preview-btn"
            >
              👁️ Probar vista previa en pestaña nueva
            </Link>
          </div>

          {shareUrl && (
            <div className="share-url-container">
              <label>Tu enlace listo para compartir:</label>
              <input type="text" readOnly value={shareUrl} onClick={(e) => (e.target as HTMLInputElement).select()} />
              <p>Este enlace lleva todas tus frases y configuración integradas en la URL, por lo que funciona al 100% en cualquier celular o navegador donde lo abran.</p>
            </div>
          )}

          <div className="info-box">
            <h3>💡 ¿Cómo publicar para que lo vea la otra persona?</h3>
            <ol>
              <li>
                <strong>Opción 1 (Recomendada con enlace directo):</strong> Dale al botón <em>&quot;Guardar en el proyecto&quot;</em>. Luego subes tu carpeta a GitHub y la conectas a <a href="https://vercel.com" target="_blank" rel="noreferrer">Vercel</a> o la publicas. El link que te dé Vercel (ej. <code>https://flores-para-ti.vercel.app</code>) tendrá tus frases listas para cualquiera que lo abra.
              </li>
              <li>
                <strong>Opción 2 (Instantánea sin volver a publicar):</strong> Puedes publicar el proyecto una sola vez en Vercel y después, cada vez que generes un enlace con <em>&quot;Copiar enlace personalizado&quot;</em>, las frases viajarán dentro de la URL, funcionando inmediatamente en cualquier teléfono.
              </li>
            </ol>
          </div>
        </form>
      </div>
    </div>
  );
}
