import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicDir = path.join(process.cwd(), "public");
    await fs.mkdir(publicDir, { recursive: true });
    const targetPath = path.join(publicDir, "music.mp3");

    await fs.writeFile(targetPath, buffer);

    return NextResponse.json({
      success: true,
      message: "Canción guardada en public/music.mp3",
      url: "/music.mp3"
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Error al guardar el archivo de música" },
      { status: 500 }
    );
  }
}
