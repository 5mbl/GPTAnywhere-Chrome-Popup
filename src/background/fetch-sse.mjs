import { createParser } from "eventsource-parser";
import { streamAsyncIterable } from "./stream-async-iterable.mjs";
// Server-Sent Events (SSE) is a technology for sending data from a server to a web client in real time.

export async function fetchSSE(resource, options) {
  const { onMessage, ...fetchOptions } = options;
  const resp = await fetch(resource, fetchOptions);
  const parser = createParser((event) => {
    if (event.type === "event") {
      onMessage(event.data);
    }
  });
  for await (const chunk of streamAsyncIterable(resp.body)) {
    const str = new TextDecoder().decode(chunk);
    parser.feed(str);
  }
}