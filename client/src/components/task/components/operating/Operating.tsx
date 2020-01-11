import { Icon, message, Upload } from "antd";
import { Button, Toast } from "antd-mobile";
import * as React from "react";
import { useState } from "react";
import { TASK_STATUS_CODE } from "src/types/task/task";
import { OperatingWrapper } from "./Operating.style";

type TConciseProps = {
  task: any;
  acceptUserTask: (acceptUserTaskInput: any) => void;
  submitUserTask: (submitUserTaskInput: any) => void;
  quitUserTask: (quitUserTaskInput: any) => void;
};

export const Operating: React.FC<TConciseProps> = ({
  task,
  acceptUserTask,
  submitUserTask,
  quitUserTask
}) => {
  const { id, status, credentials } = task;
  const [imageUrl, setImageUrl] = useState("");

  const renderButtons = () => {
    switch (status) {
      case TASK_STATUS_CODE.UNASSIGNED:
        return (
          <Button
            type="primary"
            onClick={() =>
              acceptUserTask({
                variables: {
                  acceptUserTaskInput: { taskId: id }
                }
              })
            }
          >
            接受任务
          </Button>
        );
      case TASK_STATUS_CODE.ASSIGNED:
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                if (!imageUrl) {
                  Toast.fail("请先添加凭据", 1);
                  return false;
                }
                submitUserTask({
                  variables: {
                    submitUserTaskInput: { taskId: id, credentials }
                  }
                });
                return false;
              }}
            >
              上传凭据
            </Button>
            <Button
              type="warning"
              onClick={() =>
                quitUserTask({
                  variables: {
                    quitUserTaskInput: { taskId: id }
                  }
                })
              }
            >
              放弃任务
            </Button>
          </>
        );
      case TASK_STATUS_CODE.REVIEWING:
        return (
          <Button type="primary" disabled>
            审核中
          </Button>
        );
      default:
        return null;
    }
  };

  const renderCredentials = () => {
    const [loading, setLoading] = useState(false);

    if (status === TASK_STATUS_CODE.UNASSIGNED) {
      return null;
    }

    const beforeUpload = (file: any) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("仅支持JPG/PNG格式!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error("图片不能超过2MB!");
        return false;
      }
      return false;
    };

    const uploadButton = (
      <div>
        <Icon type={loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const getBase64 = (img: any, callback: any) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result));
      reader.readAsDataURL(img);
    };

    const handleChange = (info: any) => {
      getBase64(info.file, (imageUrlItem: any) => {
        setImageUrl(imageUrlItem);
        setLoading(false);
      });
    };
    return (
      <div className="credentials-wrapper">
        <Upload
          name="credentials"
          listType="picture-card"
          className="credentials-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          disabled={status === TASK_STATUS_CODE.REVIEWING}
        >
          {imageUrl ? (
            <img
              className="credentials-uploaded-image"
              src={imageUrl}
              alt="credentials"
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </div>
    );
  };

  return (
    <OperatingWrapper>
      {renderCredentials()}
      {renderButtons()}
    </OperatingWrapper>
  );
};
