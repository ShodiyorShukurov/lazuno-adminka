import React from 'react';
import { Button, Popconfirm,  Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const App = ({
  data,
  setCurrentPage,
  currentPage,
  openDeleteModal,
  handleDelete,
  handleOpenModal,
}) => {
  const dataSource = data?.data || [];

  const columns = [
    {
      title: '№',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div className="flex items-center justify-center gap-4">
          <Button
            icon={<EditOutlined />}
            color="primary"
            variant="solid"
            onClick={() => handleOpenModal(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              color="danger"
              variant="solid"
              onClick={() => openDeleteModal(record.id)}
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      className="pt-[20px]"
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      pagination={{
        current: currentPage,
        pageSize: 10,
        total: data?.total,
        onChange: (page) => setCurrentPage(page),
      }}
    />
  );
};

export default App;
