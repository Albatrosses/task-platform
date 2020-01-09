export enum ORDER_TYPE_NAME {
  DEFAULT = "id",
  AMOUNT = "amount",
  START_DATE = "startDate",
  END_DATE = "endDate",
  SUBMIT_DATE = "submitDate",
  RESULT_DATE = "resultDate",
  SIGNIN_DATE = "signInDate",
  LOGIN_DATE = "loginDate",
  LOGOUT_DATE = "logoutDate",
  ASSIGN_DATE = "assignDate",
  UPLOAD_DATE = "uploadDate",
  REVIEW_DATE = "reviewDate"
}

export enum ORDER_STATUS_NAME {
  ASC = "asc",
  DESC = "desc"
}

export enum DATE_TYPE_NAME {
  START_DATE = "startDate",
  END_DATE = "endDate",
  SUBMIT_DATE = "submitDate",
  RESULT_DATE = "resultDate",
  SIGNIN_DATE = "signInDate",
  LOGIN_DATE = "loginDate",
  LOGOUT_DATE = "logoutDate",
  ASSIGN_DATE = "assignDate",
  UPLOAD_DATE = "uploadDate",
  REVIEW_DATE = "reviewDate"
}

export enum MESSAGE_WORD {
  UNAUTH = "权限不足",
  UNKONW_ERROR = "查询不合法或服务器发生错误",
  IMAGE_FORMAT_ERROR = "图片格式不正确",
  SIGN_IN_SUCCESS = "注册成功",
  QUERY_SUCCESS = "查询成功",
  ADD_SUCCESS = "添加成功",
  DELETE_SUCCESS = "删除成功",
  UPDATE_SUCCESS = "修改成功",
  LOGIN_SUCCESS = "登录成功",
  LOGOUT_SUCCESS = "登出成功",
  ACCEPT_TASK_SUCCESS = "接受任务成功",
  SUBMIT_TASK_SUCCESS = "提交任务成功",
  QUIT_TASK_SUCCESS = "放弃任务成功",
  UPDATE_ERROR_IMAGE_NOT_FOUND = "修改失败，该图片不存在",
  DELETE_ERROR_IMAGE_NOT_FOUND = "删除失败，该图片不存在",
  DELETE_ERROR_TASK_NOT_FOUND = "删除失败，该图片不存在",
  TASK_NOT_FOUND = "任务不存在",
  TASK_HAVE_ACCEPT = "任务已接受，请勿重复接受",
  TASK_HAVE_SUBMIT = "任务已提交，请等待审核",
  TASK_REVIEWING = "任务审核中",
  TASK_UNASSIGNED = "任务尚未接受",
  PHONE_EXIST = "手机号已存在",
  PHONE_NO_RULE = "手机号不合规",
  USER_NOT_FOUND = "用户不存在",
  USER_HAVE_LOGIN = "用户已登录",
  USER_INACTIVE = "用户未激活",
  VERIFY_CODE_ERROR = "验证码不正确",
  VERIFY_CODE_SENDED = "验证码已发送",
  PASSWORD_ERROR = "密码错误",
  PASSWORD_OLD_ERROR = "原密码错误",
  AVATAR_SIZE_EXCEED = "头像大小不能超过200KB"
}
