import Head from 'next/head'
import LayoutOutside from '../../layout/Layout-outside'
import Link from 'next/link'
import styles from '../../../styles/Form.module.css';
import { HiAtSymbol, HiFingerPrint, HiMap, HiOutlineUser, HiPhoneIncoming } from "react-icons/hi";
import { useState } from 'react';
import { useFormik } from 'formik';
import { registerValidate } from '../../utils/validate';
import { useRouter } from 'next/router';

export default function Register(){

    const [show, setShow] = useState({ password: false, cpassword: false })
    
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            username : '',
            email: '',
            password: '',
            cpassword: ''
        },
        onSubmit
    })

    async function onSubmit(values){
        const options = {
            method: "POST",
            headers : { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('/api/auth/signup', options)
            .then(res => res.json())
            .then((data) => {
                if(data) {
                    router.push('/auth/login');
                }
            }).catch(err => {
                console.log(err);
            })
    }

    return (
        <LayoutOutside>


        <Head>
            <title>Register</title>
        </Head>

        <section className='w-3/4 mx-auto flex flex-col'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                <div className={`${styles.input_group} ${formik.errors.fullname && formik.touched.fullname ? 'border-rose-600' : ''}`}>
                    <input 
                        type="text"
                        placeholder=' Nombre Completo'
                        className={styles.input_text}
                        {...formik.getFieldProps('fullname')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiOutlineUser size={25} />
                    </span>
                </div>

                <div className={`${styles.input_group} ${formik.errors.address && formik.touched.address ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    placeholder='Direccion'
                    className={styles.input_text}
                    {...formik.getFieldProps('address')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiMap size={25} />
                    </span>
                </div>

                
                <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
                    <input 
                    type="email"
                    placeholder='Email'
                    className={styles.input_text}
                    {...formik.getFieldProps('email')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>

                <div className={`${styles.input_group} ${formik.errors.phone && formik.touched.phone ? 'border-rose-600' : ''}`}>
                    <input 
                    type="text"
                    placeholder='Numero de Telefono'
                    className={styles.input_text}
                    {...formik.getFieldProps('phone')}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiPhoneIncoming size={25} />
                    </span>
                </div>

                
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.password ? "text" : "password"}`}
                    placeholder='password'
                    className={styles.input_text}
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, password: !show.password})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                <div className={`${styles.input_group} ${formik.errors.cpassword && formik.touched.cpassword ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show.cpassword ? "text" : "password"}`}
                    placeholder='Confirm Password'
                    className={styles.input_text}
                    {...formik.getFieldProps('cpassword')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow({ ...show, cpassword: !show.cpassword})}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Sign Up
                    </button>
                </div>
            </form>
            <p className='text-center text-gray-400 '>
                Have an account? <Link href={'/auth/login'} className='text-blue-700'>Sign In</Link>
            </p>
        </section>
        </LayoutOutside>
    )
}