import Head from 'next/head'
import MainLayout from 'components/main-layout'
import Loan from 'components/loan'
import _ from 'lodash'
import axios from 'axios'

const fetchData = async api =>
  await axios
    .get(api)
    .then(res => ({
      error: false,
      loan: res.data
    }))
    .catch(() => ({
      error: true,
      loan: null
    }))

const fetchLoan = async loanId => {
  const loanApi = `https://ergo-lend.herokuapp.com/api/lend/${loanId}`
  console.log(loanApi)
  return fetchData(loanApi)
}

export default function PageLoan({ loan }) {
  return (
    <div className="">
      <Head>
        <title>Ergo Lend</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>{loan && <Loan loanData={loan.loan} />}</MainLayout>
    </div>
  )
}

export const getServerSideProps = async ({ query, params }) => {
  const loan = await fetchLoan(params.loan)
  // if (!loan) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }

  return {
    props: {
      loan
    }
  }
}
