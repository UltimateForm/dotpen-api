export function getHeaderValue(request: Request, key: string): string {
  const headers = request.headers;
  return headers[key];
}

export function getAuthorizationToken(request: Request): string | undefined {
  const authorizationHeader = getHeaderValue(request, "authorization");
  if (!authorizationHeader) return undefined;
  const [type, token] = authorizationHeader.split(" ");
  return type === "Bearer" ? token : undefined;
}
