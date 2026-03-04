export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || '';
  const base = host ? `${proto}://${host}` : '';

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Booking API</title>
        <style>body{font-family:system-ui,Segoe UI,Roboto,Arial;background:#f8fafc;color:#0f172a;padding:2rem}</style>
      </head>
      <body>
        <h1>Concurrent Ticket Booking — API</h1>
        <p>This project exposes serverless API endpoints:</p>
        <ul>
          <li><a href="/api/seats">GET /api/seats</a> — list seats</li>
          <li>POST <code>/api/book?seatId=1</code> — book seat 1 (use POST)</li>
        </ul>
        <p>Example curl:</p>
        <pre>curl -X POST "${base}/api/book?seatId=1"</pre>
        <p>If you deployed to Vercel, use your project domain in the curl command.</p>
      </body>
    </html>
  `);
}
