import { Modal, Form, Input, Button, ConfigProvider } from "antd";
import { IEditDiscModalProps } from "../../types/crud";

function EditDiscModal({ modalVisible, initialValues, onCancel, onUpdate }: IEditDiscModalProps) {
  const auth: string = localStorage.getItem("token") || "";
  const [form] = Form.useForm();
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = { ...initialValues, ...values };
      onUpdate(auth, updatedData);
      onCancel();
      form.resetFields()
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
      title="Editar álbum"
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
            {
              max: 100, message: "La longitud máxima son 100 caracteres"
            }
          ]}
        >
          <Input maxLength={101} />
        </Form.Item>
        <Form.Item
          label="Genero"
          name="genre"
          rules={[
            { 
              required: true, 
              message: "Por favor ingrese el genero"
             },
             {
              max: 15, message: "La longitud máxima son 15 caracteres"
            }
            ]}
        >
          <Input maxLength={16} />
        </Form.Item>
        <Form.Item
          label="Autor"
          name="author"
          rules={[
            { 
              required: true, 
              message: "Por favor ingrese el autor" 
            },
            {
              max: 50, message: "La longitud máxima son 50 caracteres"
            }
          ]}
        >
          <Input maxLength={51} />
        </Form.Item>
      </Form>
    </Modal>
    </ConfigProvider>
  );
}

export default EditDiscModal;
