import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { store } from "@/lib/data-store"

export async function GET() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get("user_token")?.value
  const userName = cookieStore.get("user_name")?.value
  const userEmail = cookieStore.get("user_email")?.value
  if (!userCookie || !userName) {
    return NextResponse.json({ authed: false }, { status: 401 })
  }
  return NextResponse.json({ authed: true, name: userName, email: userEmail || "" })
}
