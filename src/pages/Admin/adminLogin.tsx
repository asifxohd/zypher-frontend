import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { BASE_URL } from '../../constents';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import jsCookies from 'js-cookie'


interface FormValues {
  username: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const initialValues: FormValues = { username: '', password: '' };
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    username: Yup.string() // Changed from 'email' to 'username'
      .required('Username is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password condition does not match'
      )
      .required('Password is required'),
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    try {
        const response = await axios.post(BASE_URL + 'api/token/', { username: values.username, password: values.password });
        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        const decodedToken: any = jwtDecode(accessToken);
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        jsCookies.set('accessToken', accessToken);
        jsCookies.set('refreshToken', refreshToken);
        console.log(decodedToken);

        if (decodedToken.role === "admin") {
          navigate("/admin")
        } else {
            toast.error("Invalid user credentials");
        }

    } catch (error: any) {
        if (error.response) {
            console.log(error.response.data.detail);
            toast.error(error.response.data.detail);                
        } else if (error.request) {
            console.error('Request Error:', error.request);
        } else {
            console.error('Error:', error.message);
        }
    }
};


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className='flex justify-center items-center h-svh'>
      <div className="relative max-sm:w-72 flex flex-col border p-5 text-gray-700 bg-transparent shadow-none rounded bg-clip-border">
        <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Sign In
        </h4>
        <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Welcome back! Enter your credentials to sign in.
        </p>
        <br />
        <form onSubmit={formik.handleSubmit} className="max-w-screen-lg max-sm:w-60  mb-2 w-80 sm:w-96">
          <div className="flex flex-col max-sm:w-60 gap-6 mb-1">
            <h6 className="block max-sm:w-60  -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Email
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="text"
                name="username"
                placeholder="name@mail.com"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="peer h-full max-sm:w-64 w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                required
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="error-message text-red-500 text-xs">{formik.errors.username}</div>
              ) : null}
            </div>
            <h6 className="block max-sm:w-60 -mb-3 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
              Password
            </h6>
            <div className="relative h-11 w-full min-w-[200px]">
              <input
                type="password"
                name="password"
                placeholder="Enter The Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className="peer h-full w-full rounded-md border max-sm:w-64 border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message text-xs text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="mt-8 block w-full max-sm:w-64 select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            disabled={formik.isSubmitting}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
