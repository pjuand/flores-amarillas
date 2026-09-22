import Experience from "@/components/Experience";
import { finalLetter, flowerMessages, recipientName } from "@/lib/content";
import { decodeContent, GiftContent } from "@/lib/share";

type Props = { searchParams: Promise<{ scene?: string; d?: string; m?: string }> };
type Scene = "seed" | "growing" | "flower" | "bouquet" | "letter";
const scenes: Scene[] = ["seed", "growing", "flower", "bouquet", "letter"];

export default async function Home({ searchParams }: Props) {
  const { scene, d, m } = await searchParams;
  const initialScene = scenes.includes(scene as Scene) ? (scene as Scene) : "seed";

  let content: GiftContent = {
    name: recipientName,
    messages: flowerMessages,
    letter: finalLetter,
  };
  let musicSource = m || "/music.mp3";

  if (d) {
    const decoded = decodeContent(d);
    if (decoded) {
      content = {
        name: typeof decoded.name === "string" ? decoded.name : content.name,
        messages:
          Array.isArray(decoded.messages) && decoded.messages.length === 5
            ? decoded.messages
            : content.messages,
        letter: typeof decoded.letter === "string" ? decoded.letter : content.letter,
      };
      if (decoded.music) {
        musicSource = decoded.music;
      }
    }
  }

  return (
    <Experience
      initialScene={initialScene}
      initialContent={content}
      initialMusic={musicSource}
    />
  );
}
