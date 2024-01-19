import Head from 'next/head';
import Header from 'src/components/header';
import { useRouter } from 'next/router';
import SessionAuthProvider from 'src/providers/SessionAuthProvider';

type LayoutType = {
  title?: string;
  children?: React.ReactNode;
}

export default ({ children, title = 'Wompi' }: LayoutType) => {

  const router = useRouter();
  const pathname = router.pathname;

  return (
    //
      <div className="app-main">
        <Head>
          <title>{ title }</title>
        </Head>

        <Header />

        <main className={(pathname !== '/' ? 'main-page' : '')}>
        { children } 
        </main>
      </div>
    // 
  )
}