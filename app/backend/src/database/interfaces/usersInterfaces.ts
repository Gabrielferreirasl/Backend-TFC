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
  userId?: number,
}

export {
  Login,
  User,
};

export default Login;
