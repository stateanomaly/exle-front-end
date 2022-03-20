const backendUri = 'https://ergo-lend.herokuapp.com'

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

const mock = false
export const getCreateLoanApi = () => {
  if (mock) {
    return mockCreateLoanApi
  } else {
    return createLoanApi
  }
}

export const getFundLoanApi = () => {
  if (mock) {
    return mockFundLoanApi
  } else {
    return fundLoanApi
  }
}

export const getFundRepaymentApi = () => {
  if (mock) {
    return mockFundRepaymentApi
  } else {
    return fundRepaymentApi
  }
}

export const getFullyFundRepaymentApi = () => {
  if (mock) {
    return mockFullyFundRepaymentApi
  } else {
    return fullyFundRepaymentApi
  }
}
