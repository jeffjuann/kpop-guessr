
// COMPONENTS
import Head from 'next/head'
import axios from 'axios';

// TYPES
import { idolProps } from '@/types';

// STYLES
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css';
import tableStyles from '@/styles/Table/Table.module.css';
import { table } from 'console';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ idols }: { idols: idolProps[]})
{
  console.log(idols)
  
  return (
    <>
      <Head>
        <title>kpop - guessr</title>
        <meta name="description" content="a KPOP Game inspired by playfootball.games" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className={`${styles.main} ${inter.className}`}>
        <h1>{"IDOL LIST"}</h1>
        <div className={`${tableStyles.container}`}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Group</th>
                <th>Birth</th>
                <th>Agency</th>
                <th>Generation</th>
                <th>Nationality</th>
              </tr>
            </thead>
            <tbody>
              {
                idols.map((idol: idolProps) =>
                {
                  return (
                    <tr>
                      <td className={`${tableStyles.data}`}>{idol.name}</td>
                      <td className={`${tableStyles.dataMiddle}`}>{idol.group}</td>
                      <td className={`${tableStyles.dataMiddle}`}>{idol.birth}</td>
                      <td className={`${tableStyles.dataMiddle}`}>{idol.agency}</td>
                      <td className={`${tableStyles.dataMiddle}`}>{idol.generation}</td>
                      <td className={`${tableStyles.data}`}>{idol.nationality}</td>
                    </tr>
                  )
                })
              }
            </tbody>
            <tfoot>

            </tfoot>
          </table>
        </div>
      </main>
    </>
  )
}

// const URL = 'http://localhost:3000'; 
const URL = "https://1hf9sbc2-3000.asse.devtunnels.ms/"; // Port Forward URL

export async function getServerSideProps(context: any)
{
  const idols = await axios.get(`${URL}/api/idols?all=true`)
  .then((response) =>
  {
    return (response.data)
  }).catch((err) =>
  {
    console.log(err);
    return {
      props: {
        error: '[ERR]: Failed Fetching Idols',
      }
    }
  });
  return {
    props: {
      idols: idols,
    }
  } 
}