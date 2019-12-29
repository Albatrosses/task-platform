import { Icon, message, Upload } from "antd";
import { Button, Toast } from "antd-mobile";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { TASK_STATUS_CODE } from "src/components/task/enum";
import { TTask } from "src/components/task/type";
import { OperatingWrapper } from "./Operating.style";

type TConciseProps = {
  taskDetail: TTask;
  changeTaskDetail: any;
};

export const Operating: React.FC<TConciseProps> = ({
  taskDetail,
  changeTaskDetail
}) => {
  const { id, status } = taskDetail;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [hideFixedButton, setHideFixedButton] = useState(true);
  const operatingRef = useRef(null);

  useEffect(() => {
    const appWrapperDom: any = document.querySelector(".app-wrapper");
    const callback = (event: any) => {
      const operatingDom: any = operatingRef.current;
      const { top, bottom } = operatingDom.getBoundingClientRect();
      const operatingShowViewport =
        top <= event.target.clientHeight && bottom > 0;
      setHideFixedButton(!operatingShowViewport);
    };

    appWrapperDom.addEventListener("scroll", callback);
    return () => {
      appWrapperDom.removeEventListener("scroll", callback);
    };
  }, []);

  const renderButtons = () => {
    if (status === TASK_STATUS_CODE.UNASSIGNED) {
      return (
        <Button
          type="primary"
          onClick={() =>
            changeTaskDetail({
              variables: {
                input: { id, status: TASK_STATUS_CODE.ASSIGNED }
              }
            })
          }
        >
          接受任务
        </Button>
      );
    }
    if (status === TASK_STATUS_CODE.ASSIGNED) {
      return (
        <>
          <Button
            type="primary"
            onClick={() => {
              if (!imageUrl) {
                Toast.fail("请先添加凭据", 1);
                return false;
              }
              changeTaskDetail({
                variables: {
                  input: { id, status: TASK_STATUS_CODE.REVIEWING, imageUrl }
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
              changeTaskDetail({
                variables: {
                  input: { id, status: TASK_STATUS_CODE.UNASSIGNED }
                }
              })
            }
          >
            放弃任务
          </Button>
        </>
      );
    }
    if (status === TASK_STATUS_CODE.REVIEWING) {
      return (
        <Button type="primary" disabled>
          审核中
        </Button>
      );
    }
    return null;
  };

  const renderFixedButton = () => {
    return (
      hideFixedButton && (
        <div className="fixed-button-wrapper">{renderButtons()}</div>
      )
    );
  };

  const renderStaticButton = () => {
    return (
      !hideFixedButton && (
        <div className="static-button-wrapper">{renderButtons()}</div>
      )
    );
  };

  const renderCredentials = () => {
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
    <OperatingWrapper ref={operatingRef}>
      {renderFixedButton()}
      {renderCredentials()}
      {renderStaticButton()}
    </OperatingWrapper>
  );
};
