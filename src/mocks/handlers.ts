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
  // 주행중인 특정 응급차량 경로 조회
  http.post(
    `http://${import.meta.env.VITE_API_SERVER}:7001/api/admin/monit/vehicle-status/emergency`,
    () => {
      return HttpResponse.json({
        httpStatus: "OK",
        code: 200,
        data: {
          vehicleStatusId: "7e9fb584-8626-c699-bb2f-08869579cd1a",
          vehicleId: 11,
          vehicleType: "MEDIUM_CAR",
          licenceNumber: "234533443435432",
          longitude: null,
          latitude: null,
          direction: 0.8613939981900671,
          navigationPathId: 1,
          destLatitude: 127.107958,
          destLongitude: 37.3634459,
          sourceLatitude: 127.1059845,
          sourceLongitude: 37.3426011,
          currentPathPoint: 4,
          distance: 2592,
          duration: 409961,
          provider: "NAVER",
          pathPointSize: 71,
          pathPoints: [
            {
              latitude: 127.1059844,
              longitude: 37.3426228,
              index: 0,
            },
            {
              latitude: 127.1061109,
              longitude: 37.3426223,
              index: 1,
            },
            {
              latitude: 127.1073663,
              longitude: 37.3426165,
              index: 2,
            },
            {
              latitude: 127.1080685,
              longitude: 37.342618,
              index: 3,
            },
            {
              latitude: 127.1086206,
              longitude: 37.3426207,
              index: 4,
            },
            {
              latitude: 127.1089367,
              longitude: 37.3426163,
              index: 5,
            },
            {
              latitude: 127.1089351,
              longitude: 37.342711,
              index: 6,
            },
            {
              latitude: 127.1089348,
              longitude: 37.3427696,
              index: 7,
            },
            {
              latitude: 127.1089344,
              longitude: 37.3428534,
              index: 8,
            },
            {
              latitude: 127.108926,
              longitude: 37.3433861,
              index: 9,
            },
            {
              latitude: 127.1089243,
              longitude: 37.3434825,
              index: 10,
            },
            {
              latitude: 127.108925,
              longitude: 37.3435826,
              index: 11,
            },
            {
              latitude: 127.1089252,
              longitude: 37.3437611,
              index: 12,
            },
            {
              latitude: 127.1089239,
              longitude: 37.34378,
              index: 13,
            },
            {
              latitude: 127.1089283,
              longitude: 37.3444614,
              index: 14,
            },
            {
              latitude: 127.1089304,
              longitude: 37.3447012,
              index: 15,
            },
            {
              latitude: 127.1089358,
              longitude: 37.3456324,
              index: 16,
            },
            {
              latitude: 127.1089357,
              longitude: 37.3456387,
              index: 17,
            },
            {
              latitude: 127.108937,
              longitude: 37.3458244,
              index: 18,
            },
            {
              latitude: 127.1089417,
              longitude: 37.3460083,
              index: 19,
            },
            {
              latitude: 127.1089416,
              longitude: 37.3460308,
              index: 20,
            },
            {
              latitude: 127.1089436,
              longitude: 37.3460849,
              index: 21,
            },
            {
              latitude: 127.1090174,
              longitude: 37.3473182,
              index: 22,
            },
            {
              latitude: 127.1090186,
              longitude: 37.3475147,
              index: 23,
            },
            {
              latitude: 127.1090198,
              longitude: 37.3477239,
              index: 24,
            },
            {
              latitude: 127.1090169,
              longitude: 37.3487109,
              index: 25,
            },
            {
              latitude: 127.1090154,
              longitude: 37.3492264,
              index: 26,
            },
            {
              latitude: 127.1090155,
              longitude: 37.3494257,
              index: 27,
            },
            {
              latitude: 127.1090171,
              longitude: 37.3497628,
              index: 28,
            },
            {
              latitude: 127.1090169,
              longitude: 37.3497961,
              index: 29,
            },
            {
              latitude: 127.1090174,
              longitude: 37.3499277,
              index: 30,
            },
            {
              latitude: 127.1090172,
              longitude: 37.3499701,
              index: 31,
            },
            {
              latitude: 127.109017,
              longitude: 37.3499944,
              index: 32,
            },
            {
              latitude: 127.1090146,
              longitude: 37.350236,
              index: 33,
            },
            {
              latitude: 127.1090135,
              longitude: 37.3504496,
              index: 34,
            },
            {
              latitude: 127.1090103,
              longitude: 37.3508651,
              index: 35,
            },
            {
              latitude: 127.1090053,
              longitude: 37.3513807,
              index: 36,
            },
            {
              latitude: 127.108964,
              longitude: 37.3521666,
              index: 37,
            },
            {
              latitude: 127.1089502,
              longitude: 37.3524234,
              index: 38,
            },
            {
              latitude: 127.1088898,
              longitude: 37.3531804,
              index: 39,
            },
            {
              latitude: 127.108894,
              longitude: 37.3532426,
              index: 40,
            },
            {
              latitude: 127.1088885,
              longitude: 37.3534382,
              index: 41,
            },
            {
              latitude: 127.1088795,
              longitude: 37.3536554,
              index: 42,
            },
            {
              latitude: 127.1088401,
              longitude: 37.3545062,
              index: 43,
            },
            {
              latitude: 127.1088181,
              longitude: 37.3548297,
              index: 44,
            },
            {
              latitude: 127.1088028,
              longitude: 37.3549324,
              index: 45,
            },
            {
              latitude: 127.1085386,
              longitude: 37.3564639,
              index: 46,
            },
            {
              latitude: 127.1084946,
              longitude: 37.3566666,
              index: 47,
            },
            {
              latitude: 127.1084757,
              longitude: 37.3568341,
              index: 48,
            },
            {
              latitude: 127.1082065,
              longitude: 37.3584323,
              index: 49,
            },
            {
              latitude: 127.1081461,
              longitude: 37.3589865,
              index: 50,
            },
            {
              latitude: 127.1081254,
              longitude: 37.3597066,
              index: 51,
            },
            {
              latitude: 127.1081198,
              longitude: 37.3599049,
              index: 52,
            },
            {
              latitude: 127.1081195,
              longitude: 37.3599716,
              index: 53,
            },
            {
              latitude: 127.1081189,
              longitude: 37.3600852,
              index: 54,
            },
            {
              latitude: 127.1081195,
              longitude: 37.360187,
              index: 55,
            },
            {
              latitude: 127.1081174,
              longitude: 37.3605917,
              index: 56,
            },
            {
              latitude: 127.1081172,
              longitude: 37.3606332,
              index: 57,
            },
            {
              latitude: 127.1081134,
              longitude: 37.3611334,
              index: 58,
            },
            {
              latitude: 127.1081142,
              longitude: 37.3612083,
              index: 59,
            },
            {
              latitude: 127.1081173,
              longitude: 37.3614787,
              index: 60,
            },
            {
              latitude: 127.1081217,
              longitude: 37.3617113,
              index: 61,
            },
            {
              latitude: 127.1081253,
              longitude: 37.3618834,
              index: 62,
            },
            {
              latitude: 127.1081241,
              longitude: 37.3621268,
              index: 63,
            },
            {
              latitude: 127.1081248,
              longitude: 37.3622142,
              index: 64,
            },
            {
              latitude: 127.1081273,
              longitude: 37.3630246,
              index: 65,
            },
            {
              latitude: 127.1081284,
              longitude: 37.3632445,
              index: 66,
            },
            {
              latitude: 127.1081284,
              longitude: 37.363249,
              index: 67,
            },
            {
              latitude: 127.108129,
              longitude: 37.3633509,
              index: 68,
            },
            {
              latitude: 127.1081297,
              longitude: 37.3634428,
              index: 69,
            },
            {
              latitude: 127.107958,
              longitude: 37.3634414,
              index: 70,
            },
          ],
          checkPoints: [
            {
              longitude: 37.342711,
              latitude: 127.1089351,
              pointIndex: 6,
              distance: 1072.6603892877283,
              duration: 0,
            },
            {
              longitude: 37.3456324,
              latitude: 127.1089358,
              pointIndex: 16,
              distance: 1256.5586674255483,
              duration: 0,
            },
            {
              longitude: 37.3487109,
              latitude: 127.1090169,
              pointIndex: 25,
              distance: 1130.5677886812111,
              duration: 0,
            },
            {
              longitude: 37.3504496,
              latitude: 127.1090135,
              pointIndex: 34,
              distance: 1155.3937407840685,
              duration: 0,
            },
            {
              longitude: 37.3532426,
              latitude: 127.108894,
              pointIndex: 40,
              distance: 1174.8530725222045,
              duration: 0,
            },
            {
              longitude: 37.3566666,
              latitude: 127.1084946,
              pointIndex: 47,
              distance: 1314.8675288732952,
              duration: 0,
            },
            {
              longitude: 37.3599049,
              latitude: 127.1081198,
              pointIndex: 52,
              distance: 1177.681730347979,
              duration: 0,
            },
            {
              longitude: 37.3618834,
              latitude: 127.1081253,
              pointIndex: 62,
              distance: 1093.5834644476674,
              duration: 0,
            },
          ],
        },
      });
    }
  ),
];
