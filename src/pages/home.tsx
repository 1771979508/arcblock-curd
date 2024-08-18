import { useEffect, useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './home.css';
import api from '../libs/api';

function Home() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  async function getApiData() {
    const { data } = await api.get('/api/getUser?id=1');
    const resUser = data.data[0];
    const { name, email, phone } = resUser;
    setUser({
      ...user,
      name,
      email,
      phone,
    });
  }

  const handleSubmit = async () => {
    const { data } = await api.post('/api/editUser', {
      id: 1,
      ...user,
    });
    if (data.code === 0) {
      alert('更新成功！');
      getApiData();
    }
  };

  useEffect(() => {
    getApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="demonstration-callout-container">
      <h2>Person Profile</h2>

      <div className="form-wrapper">
        <Form.Label className="label" htmlFor="basic-url">
          用户名🧐
        </Form.Label>
        <InputGroup className="mb-3 flex-width">
          <Form.Control
            id="basic-url"
            aria-describedby="basic-addon3"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </InputGroup>

        <Form.Label className="label" htmlFor="basic-url">
          邮箱📮
        </Form.Label>
        <InputGroup className="mb-3 flex-width">
          <Form.Control
            id="basic-url"
            aria-describedby="basic-addon3"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </InputGroup>

        <Form.Label className="label" htmlFor="basic-url">
          手机号📱
        </Form.Label>
        <InputGroup className="mb-3 flex-width">
          <Form.Control
            id="basic-url"
            aria-describedby="basic-addon3"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
        </InputGroup>

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Edit
        </Button>
      </div>
    </div>
  );
}

export default Home;
