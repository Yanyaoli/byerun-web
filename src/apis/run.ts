import request from "@/services/request";
import address from "@/services/address";
import { genTrackPoints, getDate } from "@/utils/track";
import { APPVERSION, BRAND, MOBILETYPE, SYSVERSION } from "@/utils/appConfig";

interface ActivityData {
  runDistance: number;
  mapChoice: string;
  runTime: number;
  userId: number;
  semesterYear: number;
}

// 获取跑步标准信息
export const getRunStandard = (schoolId: number) =>
  request.get(address.runStandard, {
    params: {
      schoolId,
    },
});

// 获取跑步信息
export const getRunInfo = (userId: number, yearSemester: number) =>
  request.get(address.runInfo, {
    params: {
      userId,
      yearSemester,
    },
});

// 查询跑步记录
export const queryRunRecord = (pageNum: number, pageSize: number) => {
  return request.get(address.runRecord, {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
    },
  });
};

// 提交活动信息
export const submitActivityInfo = (data: ActivityData) => {
  const { runDistance, mapChoice, runTime, userId, semesterYear } = data;
  const body = {
    againRunStatus: "0",
    againRunTime: 0,
    appVersions: APPVERSION,
    brand: BRAND,
    mobileType: MOBILETYPE,
    sysVersions: SYSVERSION,
    trackPoints: genTrackPoints(runDistance, mapChoice),
    distanceTimeStatus: "1",
    innerSchool: "1",
    runDistance,
    runTime,
    userId,
    vocalStatus: "1",
    yearSemester: semesterYear,
    recordDate: getDate(),
  };
  return request.post(address.newActivity, body);
};
