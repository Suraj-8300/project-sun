// src/index.ts — Primary Entry Point
// Receives the fetch event and delegates entirely to the router module

import { handleRequest } from './router';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return handleRequest(request, env);
  },
} satisfies ExportedHandler<Env>;