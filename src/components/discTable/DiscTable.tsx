import { useState } from "react";
import { Table, Button, Modal, Tooltip, ConfigProvider } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { IDisco, ITableProps } from "../../types/crud";
import './discTable.css';

const DiscTable = ({ token, discData, loading, onCreate, onUpdate, onDelete }: ITableProps) => {
  const [deleteModalState, setDeleteModalState] = useState<{
    visible: boolean;
    disc?: IDisco;
  }>({ visible: false, disc: undefined });

  const styleTheme = {
    "components": {
      "Table": {
        "colorBorderSecondary": '#ff9c6e',
        "colorFillAlter": '#ffbb96'
      },
      "Button":{
        "colorPrimary": '#f27c1c',
        "colorError": '#cf1322'
      },
      "Pagination": {
        "colorPrimary": "#fa541c",
        "colorPrimaryHover": "#d4380d",
        "controlOutline": "#d4380d",
        "colorPrimaryBorder": "#d4380d"
      }
    },
    "token": {
        "colorPrimary": "#d4380d",
        "wireframe": true
      }
    
  }

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
      render: (disc: IDisco) => (
        <>
          <Tooltip placement="leftTop" title={'Editar álbum'}>
            <Button
              type="primary"
              shape='round'
              className="tableButton"
              icon={<EditOutlined />}
              onClick={() => onUpdate(disc)}
            ></Button>
          </Tooltip>
          <Tooltip placement="rightTop" title={'Eliminar álbum'}>
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
      onDelete(token, deleteModalState.disc.key);
      setDeleteModalState({ visible: false, disc: undefined });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalState({ visible: false, disc: undefined });
  };

  return (
    <>
      <ConfigProvider theme={styleTheme}>
        <Table
          className="discTable"
          columns={columns}
          dataSource={discData}
          bordered
          rowKey="key"
          loading={loading}
          title={() => (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="btn-create"
              shape="round"
              onClick={() =>
                onCreate(token, { key: 0, name: "", genre: "", author: "" })
              }
            >
              Crear
            </Button>
          )}
          scroll={{ y: 500 }}
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
      </ConfigProvider>
    </>
  );
};
export default DiscTable;
