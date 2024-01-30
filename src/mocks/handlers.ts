import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(`http://${import.meta.env.VITE_API_SERVER}:7001/api/auth/roles/emergency`, () => {
    return HttpResponse.json({
      httpStatus: "OK",
      code: 200,
      data: [
        {
          memberId: 2,
          userName: "kitez2_",
        },
        {
          memberId: 1,
          userName: "kitez3_",
        },
      ],
    });
  }),
];
