import { createApp } from './app/app';

const PORT = process.env.PORT || 4000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log('Starter controllers available:', Object.keys(app.controllers));
});
