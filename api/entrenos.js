// Puente entre el sitio y NocoDB. El token vive como variable de entorno en Vercel (secreto).
// GET /api/entrenos?persona=Alejandro  -> lista registros de esa persona
// POST /api/entrenos  (body con los campos)  -> crea un registro
// DELETE /api/entrenos  (body [{"Id":n}])     -> borra un registro
module.exports = async (req, res) => {
  const BASE = (process.env.NOCODB_URL || '').trim().replace(/\/+$/, '');
  const TID = (process.env.NOCODB_TABLE_ID || '').trim();
  const TOKEN = (process.env.NOCODB_TOKEN || '').trim();
  if (!BASE || !TID || !TOKEN) {
    return res.status(500).json({ error: 'Faltan variables de entorno de NocoDB en Vercel (NOCODB_URL / NOCODB_TABLE_ID / NOCODB_TOKEN).' });
  }
  const api = `${BASE}/api/v2/tables/${TID}/records`;
  const headers = { 'xc-token': TOKEN, 'Content-Type': 'application/json' };
  const parse = (b) => (typeof b === 'string' ? JSON.parse(b || '{}') : (b || {}));
  try {
    if (req.method === 'GET') {
      const persona = (req.query && req.query.persona) || '';
      let url = `${api}?limit=500&sort=-fecha`;
      if (persona) url += `&where=${encodeURIComponent(`(persona,eq,${persona})`)}`;
      const r = await fetch(url, { headers });
      return res.status(r.status).json(await r.json());
    }
    if (req.method === 'POST') {
      const r = await fetch(api, { method: 'POST', headers, body: JSON.stringify(parse(req.body)) });
      return res.status(r.status).json(await r.json());
    }
    if (req.method === 'DELETE') {
      const r = await fetch(api, { method: 'DELETE', headers, body: JSON.stringify(parse(req.body)) });
      return res.status(r.status).json(await r.json());
    }
    return res.status(405).json({ error: 'Metodo no permitido' });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
};
