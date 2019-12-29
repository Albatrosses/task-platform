import { PLATFORM_CODE, TASK_STATUS_CODE } from "./enum";
import { TTask } from "./types";

export const taskListingData: TTask[] = [
  {
    id: 1,
    name: "抖音任务",
    simple: "这是一条抖音任务",
    description: "这是一条抖音任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.DOUYIN,
        link: "https://www.douyin.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 2,
    name: "快手任务",
    simple: "这是一条快手任务",
    description: "这是一条快手任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.KUAISHOU,
        link: "https://www.kuaishou.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 3,
    name: "微博任务",
    simple: "这是一条微博任务",
    description: "这是一条微博任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.WEIBO,
        link: "https://weibo.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 4,
    name: "微博任务",
    simple: "这是一条微博任务",
    description: "这是一条微博任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.WEIBO,
        link: "https://weibo.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 5,
    name: "微视任务",
    simple: "这是一条微视任务",
    description: "这是一条微视任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.WEISHI,
        link: "https://weishi.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 6,
    name: "西瓜视频任务",
    simple: "这是一条西瓜视频任务",
    description: "这是一条西瓜视频任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.XIGUA,
        link: "https://www.ixigua.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 7,
    name: "脸书任务",
    simple: "这是一条脸书任务",
    description: "这是一条脸书任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.FACEBOOK,
        link: "https://facebook.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 8,
    name: "多平台任务",
    simple: "这是一条多平台任务",
    description: "这是一条多平台任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.DEFAULT,
        link: "https://www.baidu.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.REVIEWING,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 9,
    name: "其他平台任务",
    simple: "这是一条其他平台任务",
    description: "这是一条其他平台任务，我是任务的详细说明",
    steps: [
      "点击复制链接",
      "打开对应应用",
      "双击点赞关注",
      "上传凭据",
      "领取酬金"
    ],
    criteria: ["凭据清晰可见"],
    platforms: [
      {
        code: PLATFORM_CODE.DEFAULT,
        link: "https://www.baidu.com/"
      }
    ],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.COMPLETED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  }
];