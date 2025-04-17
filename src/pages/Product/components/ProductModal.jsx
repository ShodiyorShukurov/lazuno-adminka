import React, { lazy, useState } from 'react';
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
import TextArea from 'antd/es/input/TextArea';
import UseCategory from '../../../hooks/UseCategory';

const ProductModal = ({
  isOpen,
  handleOpenModal,
  handleCancel,
  selectItem,
}) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const { data } = UseCategory();
console.log(selectItem)
  React.useEffect(() => {
    if (isOpen && selectItem) {
      form.setFieldsValue({
        title: selectItem.title || '',
        description: selectItem.description || '',
        color: selectItem.color || '',
        category_id: selectItem.category_id || data?.data?.[0]?.id,
      });
    }
  }, [isOpen, selectItem, form]);

  /** Upload props */
  const uploadProps = {
    beforeUpload: (file) => {
      setFileList((prev) => [...prev, file]);
      return false;
    },
    fileList,
    multiple: true,
    onChange: (info) => {
      setFileList(info.fileList);
    },
  };

  const queryClient = useQueryClient();

  const onFinish = async (values) => {
    const imageArr = fileList?.map((i) => i.originFileObj);
    console.log(imageArr);
    const formData = new FormData();
    formData.append('color', values.color);
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category_id ', values.category_id);
    imageArr.forEach((file) => {
      formData.append('files', file);
    });

    try {
      if (selectItem.id) {
        const response = await Api.put(
          `/products/${selectItem.id}`,
          formData
        );

        if (response.data) {
          message.success('Data submitted successfully!');
        }
      } else {
        const response = await Api.post('/products', formData);

        if (response.data) {
          message.success('Data submitted successfully!');
        }
      }
      setFileList([]);
      handleCancel();
      form.resetFields();
      queryClient.invalidateQueries({ queryKey: ['productData'] });
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
        Add a Product
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
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Please enter the description!' },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Color"
            name="color"
            rules={[{ required: true, message: 'Please enter the color!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category Id"
            name="category_id"
            rules={[{ required: true, message: 'Please enter the category!' }]}
          >
            <Select
              options={data?.data.map((item) => ({
                value: item?.id,
                label: item?.title,
              }))}
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

ProductModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ProductModal;
