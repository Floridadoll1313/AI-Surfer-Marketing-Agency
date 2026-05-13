
`tsx
import { RemixServer } from "react-router";
import { renderToReadableStream } from "react-dom/server";

export default function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
    {
      status: responseStatusCode,
      headers: responseHeaders
    }
  );
}
`
