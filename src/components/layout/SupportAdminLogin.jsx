import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SupportAdminLogin = () => {
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const buttonStyle = {
    position: "absolute",
    right: "50px",
    top: "30px",
    background: "white",
    color: "black",
    borderRadius: "20px",
    fontWeight: "bold",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    border: "2px solid white",
    fontSize: "medium",
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message,
      description,
      style: { marginTop: 120 },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = (values) => {
    console.log("Form values:", values);
    axios
      .post("https://server-nine-liard.vercel.app/api/support/adminlogin", values)
      .then((response) => {
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        console.log(response.data);
        setIsModalVisible(false);
        form.resetFields();
        openNotificationWithIcon(
          "success",
          "Success",
          "You have successfully logged in."
        );
        history.push("/supportadmindashboard");
      })
      .catch((error) => {
        console.error(error);
        openNotificationWithIcon(
          "error",
          "Failed",
          "There was an error, please try again."
        );
      });
  };

  return (
    <div>
      <Button style={buttonStyle} type="primary" onClick={showModal}>
        Login
      </Button>
      <Modal
        title="Login now"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                background: "#353979",
                boxShadow:
                  "0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                alignItems: "center",
              }}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupportAdminLogin;

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Button, Modal, Form, Input, notification } from 'antd';
// import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
// import axios from 'axios';

// const SupportAdminLogin = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const history = useHistory(); // Initialize useHistory hook

//   const buttonStyle = {
//     position: 'absolute',
//     right: "50px",
//     top: "30px",
//     background: "white",
//     color: "black",
//     borderRadius: "20px",
//     fontWeight: "bold",
//     boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//     border: "2px solid white",
//     fontSize: "medium"
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const openNotificationWithIcon = (type, message, description) => {
//     notification[type]({
//       message,
//       description,
//       style: { marginTop: 120 },
//     });
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleFinish = (values) => {
//     console.log('Form values:', values);
//     axios.post('https://server-nine-liard.vercel.app/api/support/adminlogin', values)
//       .then(response => {
//         console.log(response.data);
//         setIsModalVisible(false);
//         form.resetFields();
//         // Redirect to /supportmanagerdashboard
//         history.push('/supportadmindashboard');
//         openNotificationWithIcon('success', 'Success', 'You have successfully logged in.');

//       })
//       .catch(error => {
//         console.error(error);
//         openNotificationWithIcon('error', 'Failed', 'There was an error please try again.');

//       });
//   };

//   return (
//     <div>
//       <Button style={buttonStyle} type="primary" onClick={showModal}>
//         Login
//       </Button>
//       <Modal
//         title="Login now"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleFinish}
//         >
//           <Form.Item
//             name="username"
//             label="Username"
//             rules={[{ required: true, message: 'Please enter your username!' }]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[{ required: true, message: 'Please enter your password!' }]}
//           >
//             <Input.Password
//               iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               style={{
//                 background: "#353979",
//                 boxShadow: "0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//                 alignItems: "center"
//               }}
//               type="primary"
//               htmlType="submit"
//             >
//               Login
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default SupportAdminLogin;