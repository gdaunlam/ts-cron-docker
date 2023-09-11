export const nestEnvConfiguration = () => envModelTransformer(process.env);

export const envModelTransformer = (envs: any) => ({
  APP_NAME: envs.APP_NAME,
  PORT: parseInt(envs.PORT) || 3000,
  APIKEY_DEFAULT: envs.APIKEY_DEFAULT,
});
