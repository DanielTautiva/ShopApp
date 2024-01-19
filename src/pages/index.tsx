import { useEffect } from 'react';
import { useRouter } from 'next/router';


export default function HomePage(){
    
    const router = useRouter();

    useEffect(() => {
      // Redireccionar a la ruta /auth/register
      router.push('/auth/register');
    }, []) // El array vacío asegura que este efecto se ejecute solo una vez al montar el componente

}