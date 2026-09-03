import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'A report file is required.' }, { status: 400 })
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ error: 'Reports must be smaller than 10 MB.' }, { status: 413 })
  }

  return NextResponse.json({
    id: `RPT-${Date.now()}`,
    name: file.name,
    status: 'queued',
    message: 'Report uploaded and queued for mock analysis.',
  }, { status: 202 })
}
