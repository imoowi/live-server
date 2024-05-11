import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  Image,
  Row,
  Col,
} from "antd";
import LoginService from "../services/LoginService";
import CenterDiv from "../styles/centerdiv";
import { useNavigate } from "react-router-dom";
type CaptchaType = {
  captcha_code?: string;
  captcha_id?: string;
};

type LoginField = {
  username?: string;
  password?: string;
  captcha_code?: string;
  captcha_id?: string;
  remember?: string;
};

const onFinishFailed: FormProps<LoginField>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [vcodeImg, setVcodeImg] = useState("");
  const [vcodeId, setVcodeId] = useState("");

  const changeVcode = () => {
    LoginService.getCaptcha().then((res: CaptchaType) => {
      setVcodeImg(res.captcha_code ? res.captcha_code : "");
      setVcodeId(res.captcha_id ? res.captcha_id : "");
    });
  };

  const onFinish: FormProps<LoginField>["onFinish"] = (values) => {
    console.log("Success:", values);
    LoginService.login(values)
      .then((res: any) => {
        localStorage.setItem("token", res.token);
        navigate(`/event`);
      })
      .catch((e: any) => e);
  };
  useEffect(() => {
    changeVcode();
    return () => {};
  }, []);
  useEffect(() => {
    form.setFieldsValue({ captcha_id: vcodeId, captcha_code: "" });
  }, [vcodeId]);
  return (
    <>
      <CenterDiv>
        <Form
          name="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Row>
            <Col span={12}>
              <Form.Item<LoginField>
                label="用户名"
                name="username"
                rules={[{ required: true, message: "请输入用户名!" }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item<LoginField>
                label="密码"
                name="password"
                rules={[{ required: true, message: "请输入密码!" }]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item<LoginField>
                label="验证码"
                name="captcha_code"
                rules={[{ required: true, message: "请输入验证码!" }]}
              >
                <Input placeholder="请输入验证码" />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={6}>
              <Image
                width={100}
                height={"2rem"}
                src={vcodeImg}
                preview={false}
                onClick={changeVcode}
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item<LoginField>
                label="验证码id"
                name="captcha_id"
                rules={[{ required: true, message: "请输入验证码id!" }]}
                style={{ display: "none" }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item<LoginField>
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>{" "}
            </Col>
          </Row>
        </Form>
      </CenterDiv>
    </>
  );
};

export default Login;
