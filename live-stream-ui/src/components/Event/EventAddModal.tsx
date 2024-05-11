import { Button, Form, Input, Modal } from "antd";
import EventModel, {
  EventAddModalProps,
  NewDefaultEventModel,
} from "../../models/EventModel";
import { useEffect, useState } from "react";

const EventAddModal = ({
  modalProps,
  formProps,
  event,
}: EventAddModalProps) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(event);
  }, [event]);
  return (
    <>
      <Modal
        forceRender
        title={modalProps.title}
        open={modalProps.open}
        // onOk={modalProps.onOk}
        // okText="确定"
        // confirmLoading={modalProps.confirmLoading}
        onCancel={modalProps.onCancel}
        // cancelText="取消"
        maskClosable={false}
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Form
          name={event.name + "_eventForm"}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={event}
          onFinish={formProps.onFinish}
          onFinishFailed={formProps.onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <div>{event.name}</div>
          <Form.Item<EventModel>
            label="name"
            name="name"
            rules={[{ required: true, message: "name!" }]}
          >
            <Input placeholder="name" />
          </Form.Item>

          <Form.Item<EventModel>
            label="cover"
            name="cover"
            rules={[{ required: true, message: "cover!" }]}
          >
            <Input placeholder="cover" />
          </Form.Item>

          <Form.Item<EventModel>
            label="rtmp_pull"
            name="rtmp_pull"
            rules={[{ required: true, message: "rtmp_pull!" }]}
          >
            <Input placeholder="rtmp_pull" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EventAddModal;
