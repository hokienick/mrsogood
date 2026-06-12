import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.json()
  const { name, email, phone, website, industry, booking, inspiration, message, addons, takesBookings } = body

  const addonLabels = {
    'admin-dashboard': 'Admin Dashboard (+$200 one-time)',
    'extra-pages': 'Extra Pages (+$75 / page)',
  }

  const htmlContent = `
    <h2 style="font-family:sans-serif;color:#1a1a1a;">New inquiry from mistersogood.com</h2>
    <table style="font-family:sans-serif;font-size:15px;color:#1a1a1a;border-collapse:collapse;width:100%;">
      <tr><td style="padding:8px 0;font-weight:600;width:160px;">Name</td><td>${name}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;">Email</td><td>${email}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;">Phone</td><td>${phone || '—'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;">Website</td><td>${website}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;">Industry</td><td>${industry}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;">Takes Bookings</td><td>${takesBookings === true ? `Yes — ${booking || 'tool not specified'}` : takesBookings === false ? 'No' : '—'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;">Add-ons</td><td>${addons?.length ? addons.map(id => addonLabels[id] || id).join(', ') : 'None'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;vertical-align:top;">Inspiration</td><td style="white-space:pre-wrap;">${inspiration || '—'}</td></tr>
      <tr><td style="padding:8px 0;font-weight:600;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${message || '—'}</td></tr>
    </table>
  `

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Mr. So Good Site', email: 'nick@mistersogood.com' },
      to: [{ email: 'nick@mistersogood.com', name: 'Nick' }],
      replyTo: { email, name },
      subject: `New inquiry from ${name}`,
      htmlContent,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Brevo error status:', res.status)
    console.error('Brevo error body:', err)
    return NextResponse.json({ error: 'Failed to send', details: err }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
