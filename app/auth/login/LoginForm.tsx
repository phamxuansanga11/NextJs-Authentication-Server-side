'use client';

import React, { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from './actions';
import { PATH_NAME } from '@/app/constants/pathName';
import { toast } from 'react-toastify';

interface FormStateData {
  userName: string;
  password: string;
}

const LoginForm = () => {
  // const [state, loginAction] = useActionState(login, undefined);

  const [formState, setFormState] = useState<FormStateData>({
    userName: '',
    password: '',
  });

  // console.log({ state, loginAction });

  // useEffect(() => {
  //   if (state?.accessToken) {
  //     toast.success('Login successfully!');

  //     localStorage.setItem('@accessTokenClient', state.accessToken);

  //     window.location.replace(PATH_NAME.HOME);
  //   }
  // }, [state?.accessToken]);

  const handleSubmitForm = async () => {
    try {
      console.log({ formState });

      const response = await login({
        data: {
          userName: formState.userName,
          password: formState.password,
        },
      });

      if (response?.accessToken) {
        toast.success('Login successfully...!!');
        localStorage.setItem('@accessTokenToClient:', response.accessToken);
        window.location.replace(PATH_NAME.HOME);
      }

      console.log('response when call login actions:', response);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.stopPropagation();
        event.preventDefault();

        handleSubmitForm();
      }}
      className="max-w-sm mx-auto"
    >
      <div className="mb-5">
        <label
          htmlFor="userName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formState?.userName}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, userName: event.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="sang.pham"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="text"
          placeholder="123456"
          id="password"
          name="password"
          value={formState?.password}
          onChange={(event) =>
            setFormState((prev) => ({ ...prev, password: event.target.value }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <SubmitButton />

      {/* {state?.errors && <p>{JSON.parse(state.errors)?.message}</p>} */}
    </form>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Submit
    </button>
  );
};

export default LoginForm;
