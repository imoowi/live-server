import { FormProps, ModalProps } from "antd";

interface EventModel {
  id: number;
  name: string;
  cover: string;
  rtmp_pull: string;
  rtmp_pull_code: string;
  rtmp_push: string;
  rtmp_push_code: string;
  status: number;
  third_rtmp_push: string;
  third_rtmp_push_code: string;
  token: string;
  created_at: string;
  updated_at: string;
  description: string;
}
export default EventModel;

export const NewDefaultEventModel = () => {
  let model: EventModel = {
    id: 0,
    name: "",
    cover: "",
    rtmp_pull: "",
    rtmp_pull_code: "",
    rtmp_push: "",
    rtmp_push_code: "",
    status: 0,
    third_rtmp_push: "",
    third_rtmp_push_code: "",
    token: "",
    created_at: "",
    updated_at: "",
    description: "",
  };
  return model;
};

export interface EventAddModalProps {
  modalProps: ModalProps;
  formProps: FormProps;
  event: EventModel;
}
