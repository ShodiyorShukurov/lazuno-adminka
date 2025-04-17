import { Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const AdminCategory = ({
  data,
  openDeleteModal,
  handleDelete,
  handleOpenModal,
}) => {
  return (
    <div className="admin_main">
      {data?.data?.length > 0 ? (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-[17px] mt-[48px]">
          {data?.data?.map((item) => (
            <div
              key={item.id}
              className="relative w-full bg-cover bg-center bg-no-repeat max-h-[450px] rounded-[32px] overflow-hidden sm:h-auto project-card hover:scale-[0.97] transition-transform duration-300 ease-in-out"
              style={{
                backgroundImage: `url(${item.image_url})`,
                height: '350px',
              }}
            >
              <div
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0, 0, 0, 0) 58.7%, rgba(0, 0, 0, 0.68) 104.82%)',
                }}
                className="absolute inset-0 z-0"
              ></div>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <button
                  style={{ borderRadius: '7px' }}
                  className="absolute flex top-4 right-4 bg-[#ff4d4f] p-[10px]"
                  onClick={() => openDeleteModal(item.id)}
                >
                  <DeleteOutlined style={{ color: '#ffffff' }} />
                </button>
              </Popconfirm>
              <button
                style={{ borderRadius: '7px' }}
                className="absolute flex top-4 left-4 bg-[#1677ff] p-[10px]"
                onClick={() => handleOpenModal(item)}
              >
                <EditOutlined style={{ color: '#ffffff' }} />
              </button>
              <div className="absolute flex bottom-0 left-0 right-0 h-auto pl-[24px] pb-[24px] text-white text-[24px] leading-[140%]">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Rasm yo&apos;q</p>
      )}
    </div>
  );
};


export default AdminCategory;
