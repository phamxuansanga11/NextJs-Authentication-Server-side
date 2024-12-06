'use client';

import { logout } from '@/app/auth/login/actions';
import React, { useActionState } from 'react';
import { toast } from 'react-toastify';

const SignOut = () => {
  const [state, logoutAction] = useActionState(logout, undefined);

  return (
    <form
      action={() => {
        localStorage.clear();
        toast.success('Logout successfully');
        logoutAction();
      }}
      className="max-w-sm mx-auto"
    >
      <button type="submit">SignOut</button>
    </form>
  );
};

export default SignOut;
