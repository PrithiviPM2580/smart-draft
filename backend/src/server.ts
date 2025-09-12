import app from '@/app';
import { config } from './config/env';
import { connectToDatabase } from '@/config/database';

const PORT = config.PORT || 3001;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
