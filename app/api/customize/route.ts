import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name = "", messages = [], letter = "" } = body;

    const filePath = path.join(process.cwd(), "lib", "content.ts");
    const code = `// Personaliza este archivo con el nombre, los mensajes y la carta final.
export const recipientName = ${JSON.stringify(name)};

export const flowerMessages = ${JSON.stringify(messages, null, 2)};

export const finalLetter = ${JSON.stringify(letter)};
`;

    await fs.writeFile(filePath, code, "utf-8");
    return NextResponse.json({ success: true, message: "Contenido guardado exitosamente en lib/content.ts" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Error al escribir en lib/content.ts" },
      { status: 500 }
    );
  }
}
