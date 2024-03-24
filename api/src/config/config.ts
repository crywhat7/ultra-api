import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

export const config = {
  port: process.env.PORT || 3000,
  usarCertificados: process.env.USAR_CERTIFICADOS === 'true',
  huggingFaceToken: process.env.HUGGING_FACE_TOKEN,
  openAiKey: process.env.OPEN_AI_KEY,
};
