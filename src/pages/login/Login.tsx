import { Button, Form, Input, ConfigProvider } from "antd";
import { ILogin } from "../../types/login";
import { postLogin } from "../../services/login";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import './login.css';


const Login = () => {
  const history = useHistory();
  
  const handleSubmit = (values: ILogin) => {
    postLogin(values).then(() => {
      history.push("/");
    });
  };
  
  

  return (
  <ConfigProvider theme={{
    "components": {
      "Table": {
        "colorText": "white"
      },
      "Form": {
        "colorText": "rgb(255,255,255,1)",
        "colorTextHeading": "rgba(255,255,255,1)",
        "colorError": "#fff1f0"
      },
      "Button": {
        "colorPrimary": "#fa541c"
      },
      "Input": {
        "colorBgContainer": "#ffffff"
      }
    },
    "token": {}
  }}>
    <Container fluid className="positiorelative loginLayout d-flex flex-column justify-content-center align-items-center vh-100">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className={'login-card' }
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Usuario"
          name="user"
          rules={[{ required: true, message: "Por favor ingrese su usuario" }]}
        >
          <Input placeholder="Usuario" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[
            { required: true, message: "Por favor ingrese su contraseña" },
          ]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' shape='round' htmlType='submit'>
            Iniciar sesion
          </Button>
        </Form.Item>
      </Form>

    </Container>
    </ConfigProvider>
  );
};

export default Login;
