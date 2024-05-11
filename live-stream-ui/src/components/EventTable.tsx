import { Table, Button, Form, FormProps, ModalProps, Alert, Col } from "antd";
import EventModel, { NewDefaultEventModel } from "../models/EventModel";
import { Pages, ResponsePageData } from "../models/ResponsePageData";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EventDelModal from "./Event/EventDelModal";
import EventAddModal from "./Event/EventAddModal";
import EventService from "../services/EventService";
const { Column } = Table;

// const EventTable = ({ data, pages }: ResponsePageData<EventModel>) => {
const EventTable = (props: {
  data: Array<EventModel>;
  pages: Pages;
  reload: any;
}) => {
  const [errMsg, setErrMsg] = useState("");
  const [pageSize, setPageSize] = useState<number>(props.pages.pageSize);
  const [current, setCurrent] = useState<number>(props.pages.page);
  const [currentEvent, setCurrentEvent] =
    useState<EventModel>(NewDefaultEventModel);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: false,
    showTotal: () => `共${props.pages.count}条`,
    pageSize: pageSize,
    current: current,
    total: props.pages.totalPage,
    onShowSizeChange: (current: number, pageSize: number) =>
      changePageSize(pageSize, current),
    onChange: (current: number) => changePage(current),
  };
  const changePageSize = (pageSize: number, current: number) => {
    console.log(pageSize, current);
    setPageSize(pageSize);
  };
  const changePage = (current: number) => {
    setCurrent(current);
  };
  const showEditModal = (event: EventModel) => {
    setCurrentEvent(event);
    setAddOrEdit("编辑活动");
    showAddModal();
  };
  const showDeleteConfirmDialog = (event: EventModel) => {
    // alert(event.id);
    showModal();
    setCurrentEvent(event);
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("确定删除此活动？");
  const showModal = () => {
    setModalText("确定删除此活动？");
    setOpen(true);
  };
  const handleOk = () => {
    // setModalText("the modal will be closed after 5 seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      EventService.Delete(currentEvent.id)
        .then((deleted: boolean) => {
          if (deleted) {
            setConfirmLoading(false);
            setOpen(false);
            props.reload();
          }
        })
        .catch((e: any) => {
          setConfirmLoading(false);
          console.log("e=", e);
          alert(e.error);
        });
    }, 500);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
    setCurrentEvent(NewDefaultEventModel);
  };

  const [addOrEdit, setAddOrEdit] = useState("添加活动");
  const [openAdd, setOpenAdd] = useState(false);
  const [confirmAddLoading, setConfirmAddLoading] = useState(false);
  const showAddModal = () => {
    setOpenAdd(true);
  };
  const handleAddOk = () => {
    console.log(currentEvent);
    setConfirmAddLoading(true);
    setTimeout(() => {
      setOpenAdd(false);
      setConfirmAddLoading(false);
    }, 2000);
  };
  const handleAddCancel = () => {
    setOpenAdd(false);
    setCurrentEvent(NewDefaultEventModel);
  };

  const onFinish: FormProps<EventModel>["onFinish"] = (values: EventModel) => {
    if (currentEvent.id <= 0) {
      EventService.Add(values)
        .then((newId: number) => {
          if (newId > 0) {
            handleAddCancel();
            props.reload();
          }
        })
        .catch((e: any) => e);
    } else {
      EventService.Update(values, currentEvent.id)
        .then((updated: boolean) => {
          if (updated) {
            handleAddCancel();
            props.reload();
          } else {
            console.log("Update failed");
          }
        })
        .catch((e: any) => e);
    }
  };

  const onFinishFailed: FormProps<EventModel>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  let modalProps: ModalProps = {
    title: addOrEdit,
    open: openAdd,
    confirmLoading: confirmAddLoading,
    onCancel: handleAddCancel,
    maskClosable: false,
    okButtonProps: { style: { display: "none" } },
    cancelButtonProps: { style: { display: "none" } },
  };

  let formProps: FormProps = {
    onFinish: onFinish,
    onFinishFailed: onFinishFailed,
  };
  return (
    <>
      {() => {
        if (errMsg != "") {
          return (
            <>
              <Alert message={errMsg} type="error" />
            </>
          );
        }
      }}
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            setAddOrEdit("添加活动");
            showAddModal();
          }}
        >
          Add Event
        </Button>
      </div>
      <Table dataSource={props.data} pagination={paginationProps} rowKey="id">
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Cover" dataIndex="cover" key="cover" />
        <Column title="CreatedAt" dataIndex="created_at" key="created_at" />
        <Column title="UpdatedAt" dataIndex="updated_at" key="updated_at" />
        <Column
          title="Actions"
          dataIndex="id"
          key="deleted_at"
          render={(_, event: EventModel) => {
            return (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    showEditModal(event);
                  }}
                >
                  <EditOutlined title="修改" />
                </Button>
                <Col span={12}> </Col>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    showDeleteConfirmDialog(event);
                  }}
                >
                  <DeleteOutlined title="删除" />
                </Button>
              </>
            );
          }}
        ></Column>
      </Table>
      <EventAddModal
        modalProps={modalProps}
        formProps={formProps}
        event={currentEvent}
      ></EventAddModal>
      <EventDelModal
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      ></EventDelModal>
    </>
  );
};
export default EventTable;
