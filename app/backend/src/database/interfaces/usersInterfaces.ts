interface Login {
  email: string,
  password: string,
}

interface User {
  email: string,
  role: string,
  id: number,
  username: string,
  password?: string,
}

export {
  Login,
  User,
};

export default Login;
