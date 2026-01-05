import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { agent_id, message } = await request.json()

    if (!agent_id || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing agent_id or message' },
        { status: 400 }
      )
    }

    // Call the Lyzr agent API with correct endpoint and format
    const response = await fetch('https://agent-prod.studio.lyzr.ai/api/agency/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agent_id,
        message: message,
      }),
    })

    const responseData = await response.json()

    // Check if the response indicates an error
    if (!response.ok || responseData.error) {
      console.error('Lyzr API Error:', responseData)
      return NextResponse.json({
        success: false,
        error: responseData.error || response.statusText,
        raw_response: responseData,
      }, { status: 200 }) // Return 200 so frontend can handle the error
    }

    // Extract the message from various possible response structures
    let extractedMessage = ''

    if (typeof responseData === 'string') {
      extractedMessage = responseData
    } else if (responseData.result && responseData.result.answer) {
      extractedMessage = responseData.result.answer
    } else if (responseData.result && responseData.result.message) {
      extractedMessage = responseData.result.message
    } else if (responseData.message) {
      extractedMessage = responseData.message
    } else if (responseData.answer) {
      extractedMessage = responseData.answer
    } else if (responseData.response) {
      extractedMessage = responseData.response
    } else if (responseData.data) {
      extractedMessage = typeof responseData.data === 'string' ? responseData.data : JSON.stringify(responseData.data)
    } else {
      // Fallback: stringify the entire response
      extractedMessage = JSON.stringify(responseData, null, 2)
    }

    return NextResponse.json({
      success: true,
      response: extractedMessage,
      raw_response: responseData,
    })
  } catch (error) {
    console.error('Agent API Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to call agent API'
      },
      { status: 500 }
    )
  }
}
