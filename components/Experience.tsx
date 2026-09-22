"use client";

import { FormEvent, useState } from "react";
import Flower from "@/components/Flower";
import MessageCard from "@/components/MessageCard";
import MusicButton from "@/components/MusicButton";
import { SeedIcon, SmallBloom } from "@/components/DecorativeIcons";
import { finalLetter, flowerMessages, recipientName } from "@/lib/content";

type Scene = "seed" | "growing" | "flower" | "bouquet" | "letter";
type Content = { name: string; messages: string[]; letter: string };
type Props = {
  initialScene: Scene;
  initialContent?: Content;
  initialMusic?: string;
};

const flowerClasses = [
  "bouquet-flower one",
  "bouquet-flower two",
  "bouquet-flower three",
  "bouquet-flower four",
  "bouquet-flower five",
];

const defaultContent: Content = {
  name: recipientName,
  messages: flowerMessages,
  letter: finalLetter,
};

export default function Experience({
  initialScene,
  initialContent,
  initialMusic = "/music.mp3",
}: Props) {
  const [scene, setScene] = useState<Scene>(initialScene);
  const [message, setMessage] = useState<number | null>(null);
  const [visited, setVisited] = useState<number[]>([]);
  const [content] = useState<Content>(initialContent || defaultContent);
  const [musicSource] = useState(initialMusic);

  function begin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setScene("growing");
    window.setTimeout(() => setScene("flower"), 2900);
  }

  function openMessage(index: number) {
    setVisited((current) =>
      current.includes(index) ? current : [...current, index]
    );
    setMessage(index);
  }

  return (
    <main className={`experience scene-${scene}`}>
      <div className="grain" aria-hidden="true" />
      <MusicButton src={musicSource} />
      {scene !== "letter" && (
        <section className="scene" aria-live="polite">
          {scene === "seed" && (
            <div className="seed-content intro-enter">
              <div className="seed" aria-hidden="true" />
              <div className="ground-line" />
              <p className="eyebrow">
                Un pequeño regalo{content.name ? ` para ${content.name}` : ""}
              </p>
              <h1>Quería regalarte flores...</h1>
              <p className="subcopy">pero primero tenía que hacerlas crecer.</p>
              <form action="/" method="get" onSubmit={begin}>
                <input type="hidden" name="scene" value="growing" />
                <button className="primary-button" type="submit">
                  Empezar <SeedIcon />
                </button>
              </form>
            </div>
          )}
          {(scene === "growing" || scene === "flower") && (
            <div className="growth-content">
              <div className="single-flower-wrap">
                <Flower className="single-flower" bloom={scene === "flower"} />
              </div>
              <div className={`growth-copy ${scene === "flower" ? "visible" : ""}`}>
                <h1>Porque algunas cosas bonitas...</h1>
                <p className="subcopy delayed-copy">
                  ...merecen tiempo para crecer.
                </p>
                {scene === "flower" && (
                  <button
                    className="primary-button gift-button"
                    onClick={() => setScene("bouquet")}
                  >
                    Ver mi regalo
                  </button>
                )}
              </div>
            </div>
          )}
          {scene === "bouquet" && (
            <div className="bouquet-content">
              <div className="particles" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <p className="eyebrow bouquet-eyebrow">
                Toca cada flor para descubrirla
              </p>
              <h1>
                Feliz Día de las
                <br />
                Flores Amarillas <SmallBloom />
              </h1>
              <div
                className="bouquet"
                aria-label="Ramo de cinco flores amarillas"
              >
                {flowerClasses.map((className, index) => (
                  <Flower
                    key={className}
                    className={`${className} ${
                      visited.includes(index) ? "visited" : ""
                    }`}
                    onClick={() => openMessage(index)}
                    label={`Abrir mensaje de la flor ${index + 1}`}
                  />
                ))}
              </div>
              {visited.length > 0 && (
                <button
                  className="secondary-button letter-button"
                  onClick={() => setScene("letter")}
                >
                  Hay algo más...
                </button>
              )}
            </div>
          )}
        </section>
      )}
      {scene === "letter" && (
        <section className="letter-scene">
          <div className="letter-paper letter-enter">
            <span className="letter-mark" aria-hidden="true" />
            <p className="letter-to">
              Para ti{content.name ? `, ${content.name}` : ""}
            </p>
            {content.letter.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="everlasting">Este ramo no se marchita.</p>
            <SmallBloom />
          </div>
          <div className="final-breeze" aria-hidden="true">
            <Flower />
            <Flower />
            <Flower />
          </div>
          <p className="made-for-you">Hecho especialmente para ti.</p>
        </section>
      )}
      {message !== null && (
        <MessageCard
          number={message + 1}
          message={content.messages[message]}
          onClose={() => setMessage(null)}
        />
      )}
    </main>
  );
}
