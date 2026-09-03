import { NextResponse } from 'next/server'

type Alert = {
  id: string
  level: 'CRITICAL' | 'HIGH'
  title: string
  desc: string
  time: string
  status: 'active' | 'resolved'
  assignee: string | null
}

const alerts: Alert[] = [
  { id: 'ALT-1042', level: 'CRITICAL', title: 'Critically low oxygen detected', desc: 'Patient P-1042 has SpO2 at 89%. Immediate response recommended.', time: '2 min ago', status: 'active', assignee: null },
  { id: 'ALT-1043', level: 'HIGH', title: 'High heart rate detected', desc: 'Aarav Sharma has sustained heart rate above the safe range.', time: '6 min ago', status: 'active', assignee: null },
  { id: 'ALT-1044', level: 'HIGH', title: 'Patient condition deteriorating', desc: 'Meera Patel shows a downward oxygen trend over 30 minutes.', time: '12 min ago', status: 'active', assignee: null },
]

export async function GET() {
  return NextResponse.json({ alerts })
}

export async function PATCH(request: Request) {
  const body = await request.json() as { id?: string; action?: 'resolve' | 'assign'; assignee?: string }
  const alert = alerts.find(item => item.id === body.id)

  if (!alert || !body.action) {
    return NextResponse.json({ error: 'Alert and action are required.' }, { status: 400 })
  }

  if (body.action === 'resolve') alert.status = 'resolved'
  if (body.action === 'assign') alert.assignee = body.assignee || 'Dr. Priya Sharma'

  return NextResponse.json({ alert })
}
