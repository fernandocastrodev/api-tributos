export function getTestUserCredentials(): {
  correo: string;
  claveAcceso: string;
} {
  const correo = process.env.TEST_USER_EMAIL;
  const claveAcceso = process.env.TEST_USER_PASSWORD;

  if (!correo) {
    throw new Error('Missing required environment variable: TEST_USER_EMAIL');
  }
  if (!claveAcceso) {
    throw new Error('Missing required environment variable: TEST_USER_PASSWORD');
  }
  return { correo, claveAcceso };
}
