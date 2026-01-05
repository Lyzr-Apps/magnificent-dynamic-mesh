import { NextRequest, NextResponse } from 'next/server'

const LYZR_API_BASE_URL = 'https://agent-prod.studio.lyzr.ai/api/agency'

export async function POST(request: NextRequest) {
  try {
    const { agent_id, message } = await request.json()

    if (!agent_id || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing agent_id or message' },
        { status: 400 }
      )
    }

    // Call the Lyzr agent API
    const response = await fetch(`${LYZR_API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agent_id,
        message: message,
      }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: `Agent API error: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      response: data,
    })
  } catch (error) {
    console.error('Agent API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to call agent API' },
      { status: 500 }
    )
  }
}
