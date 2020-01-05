import { PLATFORM_CODE, TASK_STATUS_CODE } from "../enum";
import { TTask } from "../types";

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
    total: 768,
    amount: 5,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/30",
    endDate: "2020/12/31"
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
    total: 1189,
    amount: 7,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/20",
    endDate: "2020/12/21"
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
    total: 1270,
    amount: 3.5,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/26",
    endDate: "2020/12/31"
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
    total: 1000,
    amount: 4,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/11",
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
    amount: 9,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/04",
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
    total: 998,
    amount: 4.5,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/17",
    endDate: "2020/12/18"
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
    total: 1570,
    amount: 2,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/28",
    endDate: "2020/12/29"
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
    total: 764,
    amount: 3.8,
    status: TASK_STATUS_CODE.REVIEWING,
    startDate: "2019/12/04",
    endDate: "2020/12/13"
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
    total: 856,
    amount: 3,
    status: TASK_STATUS_CODE.COMPLETED,
    startDate: "2019/12/19",
    endDate: "2020/12/23"
  }
];

export const heroImageData: any[] = [
  {
    taskId: 1,
    imageSrc:
      "https://media.st.dl.bscstorage.net/steam/apps/1147560/header.jpg?t=1576578161"
  },
  {
    taskId: 2,
    imageSrc:
      "https://pic2.zhimg.com/v2-b3614e270785bce9e8fee41bb58cbb96_1200x500.jpg"
  },
  {
    taskId: 3,
    imageSrc:
      "https://img.88tph.com/production/20180503/12517401-1.jpg!/watermark/url/L3BhdGgvbG9nby5wbmc/align/center"
  },
  {
    taskId: 4,
    imageSrc:
      "http://5b0988e595225.cdn.sohucs.com/images/20190926/4715be231b2c43e4952beed67e37a029.jpeg"
  }
];
