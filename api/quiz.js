// Puente Quiz -> NocoDB. Reusa NOCODB_URL y NOCODB_TOKEN (env vars ya existentes en Vercel).
// El id de tabla NO es secreto, va aqui para no pedir otra env var.
module.exports = async (req, res) => {
  const BASE = (process.env.NOCODB_URL || '').trim().replace(/\/+$/, '');
  const TOKEN = (process.env.NOCODB_TOKEN || '').trim();
  const TID = 'mvjmwd4ozk9zto0';
  if (!BASE || !TOKEN) return res.status(500).json({ error: 'Faltan env vars de NocoDB en Vercel.' });
  const api = BASE + '/api/v2/tables/' + TID + '/records';
  const headers = { 'xc-token': TOKEN, 'Content-Type': 'application/json' };
  const parse = (b) => (typeof b === 'string' ? JSON.parse(b || '{}') : (b || {}));
  try {
    if (req.method === 'GET') {
      const persona = (req.query && req.query.persona) || '';
      let url = api + '?limit=1&sort=-Id';
      if (persona) url += '&where=' + encodeURIComponent('(persona,eq,' + persona + ')');
      const r = await fetch(url, { headers });
      return res.status(r.status).json(await r.json());
    }
    if (req.method === 'POST') {
      const r = await fetch(api, { method: 'POST', headers, body: JSON.stringify(parse(req.body)) });
      return res.status(r.status).json(await r.json());
    }
    return res.status(405).json({ error: 'Metodo no permitido' });
  } catch (e) { return res.status(500).json({ error: String((e && e.message) || e) }); }
};
