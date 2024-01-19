import Head from 'next/head'

import Link from 'next/link'
import Image from 'next/image'
import { signIn } from "next-auth/react"
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useFormik } from 'formik';
import login_validate from '../../utils/validate';
import styles from '../../../styles/Form.module.css';
import LayoutOutside from '../../layout/Layout-outside'


export default function Login(){

    const [show, setShow] = useState(false)
    const router = useRouter()
    // formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        // validate : () => {return false;},// login_validate,
        onSubmit
    })
    
    async function onSubmit(values: any){

        const login: any = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/product/products",
        })

        if(login.ok) {

            const options = {
                method: "POST",
                headers : { 'Content-Type': 'application/json'},
                body: JSON.stringify(values)
            }
    
            await fetch('/api/auth/login', options)
            .then(res => res.json())
            .then((data) => {
                if(data) {
                    localStorage.setItem('user', JSON.stringify(data));
                    router.push(login.url)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "/product/products"})
    }

    // Github Login 
    async function handleGithubSignin(){
        signIn('github', { callbackUrl : "/product/products"})
    }

    return (
        <LayoutOutside>

        <Head>
            <title>Login</title>
        </Head>
        
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Login</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
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
   
                <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    placeholder='password'
                    className={styles.input_text} 
                    {...formik.getFieldProps('password')}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                   
                </div>

                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                        Sign In with Google <Image alt="google Icon" src={'../../assets/google.svg'} width="20" height={20} ></Image>
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGithubSignin} className={styles.button_custom}>
                        Sign In with Github <Image alt="github Icon" src={'../../assets/github.svg'} width={25} height={25}></Image>
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                don't have an account yet? <Link href={'/auth/register'} className='text-blue-700'>Sign Up</Link>
            </p>
        </section>

        </LayoutOutside>
    )
}