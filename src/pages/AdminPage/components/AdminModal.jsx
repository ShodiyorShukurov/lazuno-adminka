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
          message.success('Данные успешно обновлены!');
        }
      } else {
        const response = await Api.post('/users/create/admin', data);

        if (response.data) {
          message.success('Данные успешно добавлены!');
        }
      }
      handleCancel();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['adminData'] });
    } catch (error) {
      notification.error({
        message: 'Ошибка',
        description:
          'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.',
      });
      console.error('Ошибка:', error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Добавить администратора
      </Button>

      <Modal
        title="Добавить администратора"
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
            label="Имя пользователя"
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              {
                required: selectItem?.password ? false : true,
                message: 'Пожалуйста, введите пароль!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Space size="large">
              <Button htmlType="submit" type="primary">
                Отправить
              </Button>
              <Button type="primary" danger onClick={handleCancel}>
                Отмена
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
};

export default AdminModal;