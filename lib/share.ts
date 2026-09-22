export type GiftContent = {
  name: string;
  messages: string[];
  letter: string;
  music?: string;
};

export function encodeContent(data: GiftContent): string {
  try {
    const json = JSON.stringify(data);
    if (typeof window !== "undefined") {
      const utf8Bytes = encodeURIComponent(json).replace(
        /%([0-9A-F]{2})/g,
        (_, p1) => String.fromCharCode(parseInt(p1, 16))
      );
      return btoa(utf8Bytes);
    }
    return Buffer.from(json, "utf-8").toString("base64");
  } catch {
    return "";
  }
}

export function decodeContent(encoded: string): Partial<GiftContent> | null {
  try {
    let json = "";
    if (typeof window !== "undefined") {
      const binary = atob(encoded);
      json = decodeURIComponent(
        Array.prototype.map
          .call(binary, (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
    } else {
      json = Buffer.from(encoded, "base64").toString("utf-8");
    }
    const parsed = JSON.parse(json);
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}
