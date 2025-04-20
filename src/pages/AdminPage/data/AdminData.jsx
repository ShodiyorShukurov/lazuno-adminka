import React from 'react';
import { Button, Popconfirm, Table } from 'antd';
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
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Действия',
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
            Редактировать
          </Button>
          <Popconfirm
            title="Удалить задачу"
            description="Вы уверены, что хотите удалить эту задачу?"
            onConfirm={handleDelete}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              icon={<DeleteOutlined />}
              color="danger"
              variant="solid"
              onClick={() => openDeleteModal(record.id)}
            >
              Удалить
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