import React, { useState } from 'react';
import login from "../assets/images/login.avif"
import logo from '../assets/logo.jpg';

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
// import { Button, Label, Overlay } from '../styles/styles';
// import Logo from '../artifacts/Logo';
import { Formik } from 'formik'
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
// import { Iimg } from '../interface/interface';
const LoginPage = () => {
    const [isVisible, setIsVisible] = useState(false)
    const navigate = useNavigate()
    const {setUser} = useApp() as any
    return (
        <div className='flex h-[100vh] w-[100vw] bg-green-50 '>
            <div className=' hidden md:flex h-[100%] w-[60%] text-white font-bold font-mono text-xl lg:px-[100px] md:px-[50px] flex-col justify-center '
                style={{ backgroundImage: `url(${login})` }}
            >
                {/* access */}
                <div className='pt-[100px]'>
                    <h1 className='text-left text-5xl font-extrabold  '>LASRRA INTERNAL TRACKING PORTAL</h1>
                    <p>Welcome to the LASRRA Internal Tracking Portal. Kindly login with your credentials..</p>
                </div>

            </div>
            <div className=' flex flex-col m-auto w-fit h-[100vh] justify-between content-between'>
                <div className='m-10'>
                    {/* <Logo /> */}
                    <div className='w-[150px] h-[75px] bg-cover'
                        style={{ backgroundImage: `url(${logo})` }}
                    ></div>
                </div>
                <div className='h-[40vh] flex flex-col justify-around m-auto'>
                <h3 className='text-gray-200 font-bold'>Login to Your Account</h3>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors:any = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {
                            (
                                {
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    // handleSubmit,
                                    isSubmitting,
                                    /* and other goodies */
                                }
                            ) => (
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    console.log(values,'valiues')
                                    setUser({name:values.email, loggedin:true})
                                    navigate('/receipts')
                                    // window.location.replace('/receipts')
                                }}>
                                    <div className='h-[40vh] flex flex-col justify-around m-auto'>

                                        <div className='flex flex-col '>
                                            <label htmlFor="username" className='font-extrabold'> Username:</label>
                                            <input
                                                type="email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                className='p-2'
                                                 />
                                            {errors.email && touched.email && errors.email}

                                        </div>
                                        {/* passord */}
                                        <div className='flex flex-col'>
                                            <label htmlFor="password" className='font-extrabold'> Password:</label>
                                            <div className='flex'>

                                                <input
                                                    name="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    type={`${isVisible ? "text" : "password"}`}
                                                    className='p-2'

                                                />
                                                {
                                                    isVisible ?
                                                        <AiOutlineEyeInvisible style={{ margin: "auto auto", marginLeft: "-20px" }} onClick={() => setIsVisible(!isVisible)} />
                                                        : <AiOutlineEye style={{ margin: "auto auto", marginLeft: "-20px" }} onClick={() => setIsVisible(!isVisible)} />
                                                }
                                            </div>
                                            {errors.password && touched.password && errors.password}

                                            {/* </Input> */}
                                        </div>
                                        {/* login */}

                                        <button className={`${!errors.email ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'} font-bold py-2 px-3 rounded w-fit`} type='submit' disabled={isSubmitting}>Login</button>
                                    </div>
                                </form>
                            )
                        }
                    </Formik>
                    {/* username */}
                </div>

            </div>
        </div>
    );
};

export default LoginPage;