import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("35.216.118.43:7000/api/account/create", () => {
    return HttpResponse.json({ text: "hello, world" });
  }),

  http.get("/user/:id", ({ params }) => {
    const { id } = params;
    if (id === "admin") {
      return HttpResponse.json({
        id,
        name: "John",
        job: "admin",
      });
    }
    return HttpResponse.json({
      id,
      name: "John",
      job: "normal",
    });
  }),
];
