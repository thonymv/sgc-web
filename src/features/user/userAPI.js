import api from '../../services/api';

const login = (user, password) => api.post('/login', { usu: user, clav_usu: password });

export default { login };
