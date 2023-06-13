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

  const styleTheme = {
    "components": {
      "Form": {
        "colorTextHeading": "rgba(255,255,255,1)",
        "colorError": "#ffccc7",
        "fontSize": 15
      },
      "Button": {
        "colorPrimary": "#d4380d",
        "colorPrimaryActive": "#fa8c16",
        "colorPrimaryHover": "#d46b08",
      },
      "Input": {
        "colorBgContainer": "#ffffff"
      }
    },
    "token": {}
  }


  return (
    <ConfigProvider theme={styleTheme}>
      <Container fluid className="loginLayout d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="login-logo">Vinilo</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className={'login-card'}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <h3 className='login-title'>Inicia sesión</h3>
          <Form.Item
            label="Usuario"
            name="user"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su usuario"
              },
              {
                max: 20, message: "La longitud máxima son 20 caracteres"
              }
            ]}
          >
            <Input placeholder="Usuario" maxLength={21} />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su contraseña"
              },
              {
                max: 14, message: "La longitud máxima son 14 caracteres"
              }
            ]}
          >
            <Input.Password placeholder="Contraseña" maxLength={15} />
          </Form.Item>

          <Form.Item className="btn-container">
            <Button type='primary' shape='round' htmlType='submit' className="btn-login">
              Iniciar sesion
            </Button>
          </Form.Item>
        </Form>

      </Container>
    </ConfigProvider>
  );
};

export default Login;
