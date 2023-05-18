export const NAVBAR_TABS = {
  borrower: [{
    name: 'Invoices',
    id: 'invoices',
    link: '/invoices',
  }],
  lender: [{
    name: 'Invoice Requests',
    id: 'invoice-requests',
    link: '/invoice_requests',
  }]
}

// Invoice Statuses
export const INVOICE_CREATED = 'created' 
export const INVOICE_APPROVED = 'approved' 
export const INVOICE_REJECTED = 'rejected' 
export const INVOICE_PURCHASED = 'purchased' 
export const INVOICE_CLOSED = 'closed'

// User Roles
export const USER_LENDER = 'lender'
export const USER_BORROWER = 'borrower'

export const INVOICE_STATUS_VERBS = {
  [INVOICE_CREATED]: 'create',
  [INVOICE_APPROVED]: 'approve',
  [INVOICE_REJECTED]: 'reject',
  [INVOICE_PURCHASED]: 'purchase',
  [INVOICE_CLOSED]: 'close',
}

export const INITIAL_STATE = {
  data: [],
  isLoading: false,
  isError: false,
  error: null
}

export const API_URL = {
  invoices: '/invoices',
  users: '/users',
  login: '/login',
  logout: '/logout'
};