import { Modal, Form, Input, Button } from "antd";
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={modalVisible}
      onCancel={onCancel}
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
      <Form form={form} layout="vertical" initialValues={initialValues}>
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
  );
}

export default EditDiscModal;
