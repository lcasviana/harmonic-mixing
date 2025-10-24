// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" class="h-full">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <title>Harmonic Mixing</title>
          {assets}
        </head>
        <body class="h-full bg-neutral-950 text-neutral-50">
          <div id="app" class="h-full">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
