import { Modal, Form, Input, Button, ConfigProvider } from "antd";
import { ICreateDiscModalProps } from "../../types/crud";

function CreateDiscModal({ modalVisible, initialValues, onCancel, onCreate }: ICreateDiscModalProps) {
  const auth: string = localStorage.getItem("token") || "";
  const [form] = Form.useForm();
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const newDisc = { ...initialValues, ...values };
      onCreate(auth, newDisc);
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const styleTheme = {
    "components": {
    },
    "token": {
      "colorPrimary": "#fa541c",
      "wireframe": true
    }

  }
  return (
    <ConfigProvider theme={styleTheme}>
      <Modal
        open={modalVisible}
        onCancel={onCancel}
        destroyOnClose={true}
        title="Crear nuevo álbum"
        footer={
          <>
            <Button onClick={onCancel}>Cancelar</Button>
            <Button type="primary" onClick={handleSave}>
              Guardar
            </Button>
          </>
        }
      >
        <Form preserve={false} form={form} layout="vertical" initialValues={initialValues}>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del álbum",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Genero"
            name="genre"
            rules={[{ required: true, message: "Por favor ingrese el genero" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Autor"
            name="author"
            rules={[{ required: true, message: "Por favor ingrese el autor" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default CreateDiscModal;
