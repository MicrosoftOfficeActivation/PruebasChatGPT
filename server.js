const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const rawKeys = process.env.VALID_KEYS || 'dino-power';
const validKeys = new Set(
  rawKeys
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
);

app.use(express.json());

app.post('/api/verify-key', (req, res) => {
  const { key } = req.body || {};

  if (!key) {
    return res.status(400).json({ message: 'Debes proporcionar una clave.' });
  }

  if (validKeys.has(key)) {
    return res.json({ valid: true, message: 'Acceso concedido. ¡Disfruta del juego!' });
  }

  return res.status(401).json({ message: 'Clave incorrecta. Inténtalo de nuevo.' });
});

const publicDir = __dirname;
app.use(express.static(publicDir));

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
