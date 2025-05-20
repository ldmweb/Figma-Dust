## Overview

This is an Figma plugin that explore streaming LLM responses from Dust.tt.

## Getting Started

This plugin is set up to use [Next.js](https://nextjs.org/).

To run the development server:

```bash
npm i
npm run dev
```

You can then open up the Figma desktop app and import a plugin from the manifest file in this project. You can right click on the canvas and navigate to `Plugins > Development > Import plugin from manifest...` and select the `manifest.json` in `{path to this project}/plugin/manifest.json`.

![Image showing how to import from manifest](https://static.figma.com/uploads/dcfb742580ad1c70338f1f9670f70dfd1fd42596)

## Deploy the Plugin

1. Push the code to the Pennylane repo on GitHub.
2. While deploying make sure to set the environment variable `DUST_API_KEY` and `DUST_WORKSPACE_ID` to the Dust API and Workspace key.
3. Once the app is deployed, update the `siteURL` section in the `package.json` file to point to the deployed URL.

```json
"config": {
  "siteURL": "https://jeancaisse.figma-plugin.app/"
}
```

3. Update the `manifest.json` file to add the deployed URL to the allowed domains

```json
"networkAccess": {
    "allowedDomains": ["https://eu.dust.tt", "https://jeancaisse.figma-plugin.app/"],
    "devAllowedDomains": ["http://localhost:3000"],
    "reasoning": "Dust access for AI agents interactions and deployed app access"
  }
```

4. Run `npm run build` to create the production build of the plugin that points to your deployed URL.
5. Test the plugin locally and make sure that it works after pointing to the app.
6. [Publish your plugin privately to the organization](https://help.figma.com/hc/en-us/articles/4404228629655-Create-private-organization-plugins)
7. After publishing to the organization your plugin will update automatically when you push to the Pennylane repo.

## figmaAPI

This template includes a `figmaAPI` helper at `@/lib/figmaAPI` that lets you run plugin code from inside of the iframe. This is
useful for avoiding the iframe <-> plugin postMessage API and reduces the amount of code you need to write.

**Example:**

```ts
import { figmaAPI } from "@/lib/figmaAPI";

const nodeId = "0:2";

const result = await figmaAPI.run(
  (figma, { nodeId }) => {
    return figma.getNodeById(nodeId)?.name;
  },
  // Any variable you want to pass to the function must be passed as a parameter.
  { nodeId },
);

console.log(result); // "Page 1"
```

A few things to note about this helper:

1.  The code cannot reference any variables outside of the function unless they are passed as a parameter to the second argument. This is
    because the code is stringified and sent to the plugin, and the plugin
    evals it. The plugin has no access to the variables in the iframe.
2.  The return value of the function must be JSON serializable. This is
    because the result is sent back to the iframe via postMessage, which only
    supports JSON.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Figma Plugin API](https://www.figma.com/plugin-docs/) - learn about the Figma plugin API.
- [Dust API](https://docs.dust.tt/reference/developer-platform-overview) - learn about Dust API.
