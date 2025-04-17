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

const CategoryModal = ({
  isOpen,
  handleOpenModal,
  handleCancel,
  selectItem,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (isOpen && selectItem) {
      form.setFieldsValue({
        title: selectItem.title || '',
        lang: selectItem.lang || 'en',
      });
    }
  }, [isOpen, selectItem, form]);

  /** Upload props */
  const uploadProps = {
    beforeUpload: (file) => {
      // if (file && typeof file.size === "number") {
      //   const isLt10M = file.size / 1024 / 1024 < 10; // 10MB
      //   if (!isLt10M) {
      //     message.error(`${file.name} must be less than 10MB!`);
      //     return Upload.LIST_IGNORE;
      //   }
      // } else {
      //   message.error("Error determining file size.");
      //   return Upload.LIST_IGNORE;
      // }

      if (fileList.length >= 1) {
        message.error('Only one file can be uploaded!');
        return Upload.LIST_IGNORE;
      }

      // Update the file list state
      setFileList([file]);
      return false; // Prevent auto upload
    },
    fileList,
    onChange: (info) => {
      setFileList(info.fileList);
    },
  };

  const queryClient = useQueryClient();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('lang', values.lang);
    formData.append(
      'image',
      selectItem?.image_url ? '' : fileList[0].originFileObj
    );

    try {
      if (selectItem.id) {
        const response = await Api.put(
          `/categories/${selectItem.id}`,
          formData
        );

        if (response.data) {
          message.success('Data submitted successfully!');
        }
      } else {
        const response = await Api.post('/categories', formData);

        if (response.data) {
          message.success('Data submitted successfully!');
        }
      }
      setFileList([]);
      handleCancel();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['categoryData'] });
    } catch (error) {
      message.error(
        'There was an error submitting the data. Please try again.'
      );
      console.error('Failed:', error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={handleOpenModal}>
        Add a Category
      </Button>

      <Modal
        title="Add Picture"
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
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Language"
            name="lang"
            rules={[{ required: true, message: 'Please choose a language!' }]}
          >
            <Select
              options={[
                { value: 'en', label: 'English' },
                { value: 'ru', label: 'Russian' },
                { value: 'uz', label: 'Uzbek' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Picture"
            name="attachment"
            rules={[
              {
                required: selectItem?.image_url ? false : true,
                message: 'Please upload a file!',
              },
            ]}
          >
            <Upload {...uploadProps} accept="image/*">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
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

CategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  // refreshData: PropTypes.func.isRequired,
};

export default CategoryModal;
