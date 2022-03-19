// const backendUri = 'https://ergo-lend.herokuapp.com'
const backendUri = 'http://localhost:9000'

export const lendApi = backendUri + '/api/lend'
export const getLoansApi = lendApi
export const createLoanApi = lendApi + '/create'
export const fundLoanApi = lendApi + '/fund'
export const mockCreateLoanApi = lendApi + '/mockCreate'
export const mockFundLoanApi = lendApi + '/mockFund'

export const repaymentApi = backendUri + '/api/repayment'
export const getRepaymentsApi = repaymentApi
export const fundRepaymentApi = repaymentApi + '/fund'
export const fullyFundRepaymentApi = repaymentApi + '/fullFund'
export const mockFundRepaymentApi = repaymentApi + '/mockFund'
export const mockFullyFundRepaymentApi = repaymentApi + '/mockFullFund'

export const explorerAddressUri =
  'https://explorer.ergoplatform.com/en/addresses/'
