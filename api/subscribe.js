const KONZULTACE = '193140305565845193';
const NABIDKA = '193140306555700900';
const NEWSLETTER = '193140307558139364';

const ROUTES = {
  konzultace: { group: KONZULTACE, zdroj: 'hovor' },
  'zavolejte-mi': { group: KONZULTACE, zdroj: 'hovor' },
  dotaznik: { group: KONZULTACE, zdroj: 'dotazník' },
  objednavka: { group: NABIDKA, zdroj: 'objednávka' },
  'exit-intent': { group: NEWSLETTER, zdroj: 'newsletter' }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = process.env.MAILERLITE_API_KEY;
  if (!token) {
    res.status(500).json({ error: 'MAILERLITE_API_KEY not configured' });
    return;
  }

  const body = req.body || {};
  const route = ROUTES[body.type];
  if (!route || !body.email) {
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }

  const fields = { zdroj: route.zdroj };
  if (body.jmeno) fields.name = body.jmeno;
  if (body.telefon) fields.phone = body.telefon;
  if (body.firma) fields.company = body.firma;

  const r = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({ email: body.email, groups: [route.group], fields })
  });

  if (!r.ok) {
    console.error('MailerLite error', r.status, await r.text());
    res.status(502).json({ error: 'MailerLite request failed' });
    return;
  }

  res.status(200).json({ ok: true });
}
