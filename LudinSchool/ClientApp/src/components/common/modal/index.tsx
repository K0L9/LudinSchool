import { Modal as AntModal, Button } from "antd";
import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

export interface IModalProps {
  children: ReactElement<any, any>;
  onOk: () => any;
  onCancel: () => any;
  visible: boolean;
  width: number | null | undefined;
}

const Modal = ({
  onOk,
  onCancel,
  visible,
  children,
  width = 520,
}: IModalProps) => {
  return (
    <AntModal
      destroyOnClose={true}
      onCancel={onCancel}
      onOk={onOk}
      visible={visible}
      width={width as number}
    >
      {children}
    </AntModal>
  );
};

export default Modal;
