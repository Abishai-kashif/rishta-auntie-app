import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Forward the request to your Python FastAPI backend
    // Replace 'http://localhost:8000' with your actual Python API URL
    const pythonApiUrl = process.env.PYTHON_API_URL || "http://localhost:8000"

    const response = await fetch(`${pythonApiUrl}/auntie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Python API responded with status: ${response.status}`)
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    })
  } catch (error) {
    console.error("API route error:", error)
    return new Response(JSON.stringify({ error: "Failed to connect to Python API" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
