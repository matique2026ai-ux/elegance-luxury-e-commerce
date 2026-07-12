import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, productName, color, size, height, weight } = await req.json()

    const prompt = `A realistic full-body mirror selfie of a person with the face from the provided reference photo, wearing a ${color} ${productName} (size ${size}), height approximately ${height}cm, weight approximately ${weight}kg. The person is standing in front of a mirror in a elegant dressing room with soft lighting, looking at their reflection, wearing the outfit naturally. Photorealistic, high quality, fashion photography style.`

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                ...(imageBase64
                  ? [{ inlineData: { mimeType: "image/jpeg", data: imageBase64 } }]
                  : []),
              ],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            candidateCount: 1,
          },
        }),
      }
    )

    const data = await res.json()

    if (data.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
      return NextResponse.json({
        imageBase64: data.candidates[0].content.parts[0].inlineData.data,
        mimeType: data.candidates[0].content.parts[0].inlineData.mimeType,
      })
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (text) {
      return NextResponse.json({ text })
    }

    return NextResponse.json({ error: "No image generated" }, { status: 500 })
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
