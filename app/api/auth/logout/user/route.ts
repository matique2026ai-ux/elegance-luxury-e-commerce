import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete("user_token")
  cookieStore.delete("user_name")
  cookieStore.delete("user_email")
  return NextResponse.json({ ok: true })
}
