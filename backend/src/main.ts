import { env } from "./infrastructure/config/env";
import { createApp } from "./presentation/http/app";

const app = createApp();

app.listen(env.port, () => {
  console.log(`EmbryoApp API listening on port ${env.port} (${env.nodeEnv})`);
});