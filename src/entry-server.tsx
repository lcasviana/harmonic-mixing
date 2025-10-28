// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en" class="h-dvh w-dvw">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Harmonic Mixing" />
          <link rel="manifest" href="/site.webmanifest" />
          <title>Harmonic Mixing</title>
          <meta name="description" content="An interactive web application for Harmonic Mixing for DJs, using the Camelot Wheel." />
          {assets}
        </head>
        <body class="h-dvh w-dvw overflow-auto bg-neutral-950 text-neutral-50 antialiased">
          <div id="app" class="size-full overflow-auto">
            {children}
          </div>
          {scripts}
        </body>
      </html>
    )}
  />
));
