import { useState } from "react";
import { Table, Button, Modal, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { IDisco, ITableProps } from "../../types/crud";
import './discTable.css';

const DiscTable = ({ token, discData, onCreate, onUpdate, onDelete }: ITableProps) => {
  const [deleteModalState, setDeleteModalState] = useState<{
    visible: boolean;
    disc?: IDisco;
  }>({ visible: false, disc: undefined });
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Género",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Autor",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (text: any, disc: IDisco) => (
        <>
        <Tooltip placement="leftTop" title={'Edit disc'}>
          <Button
            type="primary"
            shape='round'
            className="tableButton"
            icon={<EditOutlined />}
            onClick={() => onUpdate(disc)}
          ></Button>
          </Tooltip>
          <Tooltip placement="rightTop" title={'Delete disc'}>
          <Button
            className="tableButton"
            danger
            shape='round'
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => setDeleteModalState({ visible: true, disc })}
          >
            
          </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const handleDeleteConfirm = () => {
    if (deleteModalState.disc) {
      onDelete(token, deleteModalState.disc.id);
      setDeleteModalState({ visible: false, disc: undefined });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalState({ visible: false, disc: undefined });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={discData}
        bordered
        title={() => (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              onCreate(token, { id: 0, name: "", genre: "", author: "" })
            }
          >
            +
          </Button>
        )}
        scroll={{ y: 600 }}
      />

      <Modal
        open={deleteModalState.visible}
        onCancel={handleDeleteCancel}
        onOk={handleDeleteConfirm}
        title="Eliminar álbum"
        okText="Eliminar"
        cancelText="Cancelar"
      >
        <p>¿Está seguro que desea eliminar el álbum?</p>
      </Modal>
    </>
  );
};
export default DiscTable;
