import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, destination, travelStyle, activities, duration } = body

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ error: "First name, last name, and email are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Insert lead into database
    const result = await sql`
      INSERT INTO leads (
        first_name, 
        last_name, 
        email, 
        phone, 
        destination, 
        travel_style, 
        activities, 
        duration
      ) 
      VALUES (
        ${firstName}, 
        ${lastName}, 
        ${email}, 
        ${phone || null}, 
        ${destination}, 
        ${travelStyle}, 
        ${activities}, 
        ${duration}
      )
      ON CONFLICT (email) 
      DO UPDATE SET
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        destination = EXCLUDED.destination,
        travel_style = EXCLUDED.travel_style,
        activities = EXCLUDED.activities,
        duration = EXCLUDED.duration,
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, first_name, last_name, email, created_at
    `

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
      lead: result[0],
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to save lead information" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get all leads (for admin/business use)
    const leads = await sql`
      SELECT 
        id,
        first_name,
        last_name,
        email,
        phone,
        destination,
        travel_style,
        activities,
        duration,
        created_at,
        updated_at
      FROM leads 
      ORDER BY created_at DESC
    `

    return NextResponse.json({
      success: true,
      leads: leads,
      total: leads.length,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}
