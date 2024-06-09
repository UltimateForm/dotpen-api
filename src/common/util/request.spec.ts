import { TDeepPartial } from "@dotpen/testing/types";
import { getAuthorizationToken } from "./request";

describe("request utils", () => {
  test("extracts auth token from headers", () => {
    const req: TDeepPartial<Request> = {
      headers: {
        authorization: "Bearer token",
      } as TDeepPartial<Headers>,
    };
    const token = getAuthorizationToken(req as Request);
    expect(token).toBe("token");
  });
});
