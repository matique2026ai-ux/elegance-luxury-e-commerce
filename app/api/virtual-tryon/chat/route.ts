import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages, lang } = await req.json()

    const languageNames: Record<string, string> = { en: "English", fr: "French", ar: "Arabic" }
    const langName = languageNames[lang as string] || "English"

    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI fashion stylist assistant for MAISON HERAHIMA, a luxury fashion boutique in Algeria. Help customers choose sizes, colors, styles, and provide fashion advice. Be friendly, knowledgeable, and concise.

LANGUAGE RULES (strictly follow):
- Site language is ${langName}
- You MUST ONLY respond in ${langName}
- If the customer writes in any other language, still respond ONLY in ${langName}
- NEVER use Persian, Turkish, German, or any language other than ${langName}
- Available languages: English, French, Arabic only`,
          },
          ...messages,
        ],
        max_tokens: 500,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error("Mistral API error:", JSON.stringify(data))
      const msg = data.error?.message || data.error || `HTTP ${res.status}`
      return NextResponse.json({ error: `Mistral: ${msg}` }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({ error: "Failed to get AI response" }, { status: 500 })
  }
}
