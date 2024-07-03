import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  message,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Popconfirm,
} from "antd";
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const { confirm } = Modal;

const initialContactData = [];

function Contact() {
  const [contacts, setContacts] = useState(initialContactData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  // useEffect(() => {
  //   // Fetch initial data from the API
  //   axios.get("http://localhost:8000/api/contact/get")
  //     .then((response) => {
  //       setContacts(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       message.error("Failed to load data. Please try again.");
  //     });
  // }, []);

  useEffect(() => {
    // Fetch initial data from the API
    fetchContact();
  }, []);
  const fetchContact = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/contact/get");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      message.error("Failed to load data. Please try again.");
    }
  };
  const handleView = (record) => {
    setCurrentContact(record);
    setIsModalVisible(true);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddContact = async (values) => {
    try {
      // Make POST request to add contact
      const response = await axios.post("http://localhost:8000/api/contact/add", values);
      const newContact = {
        key: response.data.id,
        date: values.date.format("YYYY-MM-DD"),
        name: values.name,
        service: values.service,
        email: values.email,
        primaryContact: values.primaryContact,
        secondaryContact: values.secondaryContact,
      };
      setContacts([...contacts, newContact]);
      setIsModalVisible(false);
      message.success("Contact added successfully!");
    } catch (error) {
      console.error("Error adding contact:", error);
      message.error("Failed to add contact. Please try again.");
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      // Make POST request to upload CSV file
      const response = await axios.post("https://your-api-endpoint/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploading(false);
      // Assuming response.data contains uploaded contacts
      setContacts([...contacts, ...response.data]);
      message.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false);
      message.error("Failed to upload file. Please try again.");
    }
  };

  const uploadProps = {
    name: "file",
    beforeUpload: (file) => {
      // Limit file type to .csv
      const isCSV = file.type === "text/csv" || file.name.endsWith(".csv");
      if (!isCSV) {
        message.error("You can only upload CSV files!");
      }
      return isCSV;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: () => {
      // Handle file removal if needed
    },
    customRequest: ({ file }) => {
      handleUpload(file);
    },
  };

  const handleDelete = async (id) => {
    console.log("Deleting contact with ID:", id);

    try {
      await axios.delete(`http://localhost:8000/api/contact/${id}`);
      message.success("Contact deleted successfully");
      fetchContact();
      // Update contacts after deletion
      // setContacts(contacts.filter(contact => contact.key !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
      message.error("Failed to delete contact");
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Primary Contact",
      dataIndex: "primaryContact",
      key: "primaryContact",
    },
    {
      title: "Secondary Contact",
      dataIndex: "secondaryContact",
      key: "secondaryContact",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleView(record)} icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure to delete this contact?"
            icon={<ExclamationCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Contact Us Table"
              extra={
                <>
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} loading={uploading}>
                      Upload CSV
                    </Button>
                  </Upload>
                  <Button type="dashed" onClick={showModal} icon={<PlusOutlined />}>
                    Add Contact
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table columns={columns} dataSource={contacts} pagination={false} className="ant-border-space" />
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title={currentContact ? `Edit Contact - ${currentContact.name}` : "Add New Contact"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleAddContact} initialValues={currentContact}>
          <Form.Item name="date" label="Date" rules={[{ required: true, message: "Please select a date!" }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please input the name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="service" label="Service" rules={[{ required: true, message: "Please input the service!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input the email!" }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="primaryContact"
            label="Primary Contact"
            rules={[{ required: true, message: "Please input the primary contact!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="secondaryContact"
            label="Secondary Contact"
            rules={[{ required: true, message: "Please input the secondary contact!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentContact ? "Save Changes" : "Add Contact"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Contact;
