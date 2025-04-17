import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Upload,
  notification,
  Space,
  message,
  Input,
  Select,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '../../../api';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';

const AdminModal = ({ isOpen, handleOpenModal, handleCancel, selectItem }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isOpen && selectItem) {
      form.setFieldsValue({
        username: selectItem.username || '',
      });
    }
  }, [isOpen, selectItem, form]);

  /** Upload props */

  const queryClient = useQueryClient();

  const onFinish = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    try {
      if (selectItem.id) {
        const response = await Api.put(`/users/${selectItem.id}`, data);

        if (response.data) {
          message.success('Data submitted successfully!');
        }
      } else {
        const response = await Api.post('/users/create/admin', data);

        if (response.data) {
          message.success('Data submitted successfully!');
        }
      }
      handleCancel();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['adminData'] });
    } catch (error) {
      notification.error({
        message: 'Error',
        description:
          'There was an error submitting the data. Please try again.',
      });
      console.error('Failed:', error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Add a Admin
      </Button>

      <Modal
        title="Add Admin"
        open={isOpen}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={false}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter the username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: selectItem?.password ? false : true,
                message: 'Please enter the password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space size="large">
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
              <Button type="primary" danger onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

AdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  // refreshData: PropTypes.func.isRequired,
};

export default AdminModal;
