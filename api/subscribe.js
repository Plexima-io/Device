const CREATIO_WEBHOOK = 'https://webhooks.creatio.com/webhooks/f59dc400-875e-4232-bf2c-99d19bb1a685';

const ZDROJE = {
  konzultace: 'hovor',
  'zavolejte-mi': 'hovor',
  dotaznik: 'dotazník',
  objednavka: 'objednávka',
  'exit-intent': 'newsletter'
};

const SKIP = ['type', 'email', 'telefon', 'jmeno', 'souhlas', 'page'];

const LABELS = {
  firma: 'Firma',
  ico: 'IČO',
  pozice: 'Pozice',
  pocet: 'Počet kusů',
  poznamka: 'Poznámka',
  implementace: 'Zájem o implementaci',
  cena_za_kus: 'Cena za kus',
  celkem: 'Celkem',
  kategorie: 'Kategorie',
  score: 'Skóre',
  odhad_hodin_mesicne: 'Odhad hodin měsíčně',
  typ_firmy: 'Obor',
  administrativa: 'Typy jednání',
  pocet_lidi: 'Počet lidí na schůzkách',
  pocet_schuzek: 'Počet schůzek týdně',
  cas_administrativa: 'Čas na zápisy po schůzce',
  problemy: 'Problémy',
  systemy: 'Používané systémy',
  systemy_jine: 'Jiné systémy',
  prinos: 'Očekávaný přínos'
};

function splitName(jmeno) {
  const parts = String(jmeno || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: '', last: '' };
  if (parts.length === 1) return { first: parts[0], last: '' };
  return { first: parts.slice(0, -1).join(' '), last: parts[parts.length - 1] };
}

function buildCommentary(body, zdroj) {
  const lines = ['Zdroj: ' + zdroj];
  if (body.page) lines.push('Stránka: ' + body.page);
  Object.keys(body).forEach(function (key) {
    if (SKIP.includes(key)) return;
    const value = body[key];
    if (value === '' || value === null || value === undefined || value === false) return;
    if (Array.isArray(value) && value.length === 0) return;
    const label = LABELS[key] || key;
    const text = Array.isArray(value)
      ? value.join(', ')
      : (value === true || value === 'on' ? 'ano' : value);
    lines.push(label + ': ' + text);
  });
  return lines.join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const zdroj = ZDROJE[body.type];
  if (!zdroj || !body.email) {
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }

  const name = splitName(body.jmeno);
  const r = await fetch(CREATIO_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      EntityName: 'Lead',
      UsrFirstName: name.first,
      UsrLastName: name.last,
      MobilePhone: body.telefon || '',
      Email: body.email,
      Commentary: buildCommentary(body, zdroj),
      LeadTypeId: '96ed75a6-1718-4311-a690-a577d4c873b1',
      OwnerId: '9043f9e8-1bd1-4340-86d0-d74aa5a12e81',
      LeadSourceId: 'f82c416e-0cb2-4080-b4a3-58a0eeb82f24'
    })
  });

  if (!r.ok) {
    console.error('Creatio error', r.status, await r.text());
    res.status(502).json({ error: 'Creatio request failed' });
    return;
  }

  res.status(200).json({ ok: true });
}
