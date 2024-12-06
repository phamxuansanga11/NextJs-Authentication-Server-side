'use server';

import axios from 'axios';
import { setToken } from '../../lib/session';
import { redirect } from 'next/navigation';
import { PATH_NAME } from '../../constants/pathName';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { message: '200 processing request' },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  console.log('lot do route:', request);

  try {
    const data = await request.json(); // Lấy dữ liệu từ request body

    // Xử lý dữ liệu, ví dụ: lưu vào cơ sở dữ liệu
    console.log(data);

    // const { userName, password } = await request.json();
    // const response = await axios.post('http://localhost:5000/login', {
    //   userName,
    //   password,
    // });
    // if (response.status == 200) {
    //   const token = response.data?.token;

    //   await setToken(token);

    //   console.log({ token });

    //   redirect(PATH_NAME.HOME);
    // }

    // Trả về phản hồi thành công
    return NextResponse.json(
      { message: 'Data received successfully', data },
      { status: 201 },
    );
  } catch (error) {
    // Xử lý lỗi
    console.error(error);
    return NextResponse.json(
      { message: 'Error processing request' },
      { status: 500 },
    );
  }
}
