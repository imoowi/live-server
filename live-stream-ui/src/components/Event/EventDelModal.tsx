import { Modal, ModalProps } from "antd";

const EventDelModal = ({
  open,
  onOk,
  confirmLoading,
  onCancel,
}: ModalProps) => {
  return (
    <>
      <Modal
        title="删除活动"
        open={open}
        onOk={onOk}
        okText="确定"
        confirmLoading={confirmLoading}
        onCancel={onCancel}
        cancelText="取消"
        maskClosable={false}
      >
        <p>确定删除此活动？</p>
      </Modal>
    </>
  );
};
export default EventDelModal;
