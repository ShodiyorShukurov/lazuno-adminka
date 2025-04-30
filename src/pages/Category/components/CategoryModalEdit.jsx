import React, { useState } from 'react';
import {
  Modal,
  Button,
  Form,
  Upload,
  Space,
  message,
  Input,
  Select,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Api from '../../../api';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';

const CategoryModalEdit = ({
  isOpenEdit,
  handleCancel,
  selectItem,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (isOpenEdit && selectItem) {
      form.setFieldsValue({
        title: selectItem.title || '',
        lang: selectItem.lang || 'ru',
      });
    }
  }, [isOpenEdit, selectItem, form]);

  /** Upload props */
  const uploadProps = {
    beforeUpload: (file) => {
      if (fileList.length >= 1) {
        message.error('Можно загрузить только один файл!');
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false;
    },
    fileList,
    onChange: (info) => {
      setFileList(info.fileList);
    },
  };

  const queryClient = useQueryClient();

  const onFinish = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('lang', selectItem?.lang);
    formData.append(
      'image',
      fileList[0]?.originFileObj ? fileList[0].originFileObj : ''
    );

    try {
      const response = await Api.put(`/categories/${selectItem.id}`, formData);

      if (response.data) {
        setIsLoading(false);
        message.success('Данные успешно обновлены!');
      }

      setFileList([]);
      handleCancel();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['categoryData'] });
    } catch (error) {
      message.error(
        'Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.'
      );
      console.error('Ошибка:', error);
    }
  };

  return (
    <>
      <Modal
        title="Редактировать категорию"
        open={isOpenEdit}
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
            label={`Название ${
              selectItem?.lang === 'uz'
                ? '(Узбекский)'
                : selectItem?.lang === 'en'
                ? '(Английский)'
                : '(Русский)'
            }`}
            name="title"
            rules={[
              { required: true, message: 'Пожалуйста, введите название!' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            label="Язык"
            name="lang"
            rules={[{ required: true, message: 'Пожалуйста, выберите язык!' }]}
          >
            <Select
              options={[
                { value: 'en', label: 'Английский' },
                { value: 'ru', label: 'Русский' },
                { value: 'uz', label: 'Узбекский' },
              ]}
            />
          </Form.Item> */}
          <Form.Item
            label="Изображение"
            name="attachment"
            rules={[
              {
                required: selectItem?.image_url ? false : true,
                message: 'Пожалуйста, загрузите изображение!',
              },
            ]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />}>Нажмите для загрузки</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Space size="large">
              <Button htmlType="submit" type="primary" disabled={isLoading}>
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

CategoryModalEdit.propTypes = {
  isOpenEdit: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default CategoryModalEdit;
