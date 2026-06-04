import {createRequestHandler} from '@shopify/hydrogen/oxygen';

export default {
  async fetch(request, env, executionContext) {
    const requestHandler = createRequestHandler({
      build: await import('virtual:react-router/server-build'),
      mode: process.env.NODE_ENV,
    });

    return requestHandler(request, {
      env,
      executionContext,
    });
  },
};
