import { Button } from 'antd';
import { Container, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserDeleteOutlined } from "@ant-design/icons";
import './homeHeader.css'

const HomeHeader = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };



  return (
    <Navbar className='navHeader' variant="dark">
      <Container>
        <Navbar.Brand className= 'logo' href="#home">Vinilo</Navbar.Brand>
        <Button danger shape='round' type='primary' className='btn-logout' icon={<UserDeleteOutlined />} onClick={handleLogout}>
          Salir
        </Button>
      </Container>
    </Navbar>

  )
};

export default HomeHeader;