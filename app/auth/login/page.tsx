'use server';

import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = async () => {
  return (
    <div className="py-40">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
