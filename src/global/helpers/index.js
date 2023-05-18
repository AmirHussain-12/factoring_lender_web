import { LinkContainer } from 'react-router-bootstrap'
import { Button, Nav, NavDropdown } from 'react-bootstrap'
import { INVOICE_APPROVED, INVOICE_CLOSED, INVOICE_CREATED, INVOICE_PURCHASED, INVOICE_REJECTED, USER_BORROWER, USER_LENDER } from '../constants';

export const getInvoiceStatusColor = (status) => {
  let color = null;
  switch (status) {
    case INVOICE_CREATED:
      color = 'primary'
      break;
    case INVOICE_APPROVED:
      color = 'success'
      break;
    case INVOICE_REJECTED:
      color = 'danger'
      break;
    case INVOICE_PURCHASED:
      color = 'info'
      break;
    case INVOICE_CLOSED:
      color = 'secondary'
      break;
    default:
      color = 'light'
  }
  return color
}

export const renderInvoiceActionButton = ({status, role, handleStatusUpdateConfirm, handleAssignLender}) => {
  switch(role){
    case USER_LENDER:
      switch(status){
        case INVOICE_APPROVED:
          return <Button onClick={()=>handleStatusUpdateConfirm(INVOICE_PURCHASED)} variant='warning'>Purchase</Button>
        case INVOICE_PURCHASED:
          return <Button onClick={()=>handleStatusUpdateConfirm(INVOICE_CLOSED)} variant='secondary'>Close</Button>
      }
    case USER_BORROWER:
      switch(status){
        case INVOICE_CREATED:
          return [
            <Button onClick={()=>handleAssignLender()} variant='info' className='mr-2' key='assign'>Assign Lender</Button>,
            <Button onClick={()=>handleStatusUpdateConfirm(INVOICE_REJECTED)} variant='danger' key='reject'>Reject</Button>
          ]
      }
    default:
      return <p>Nothing to do Here</p>
  }
}

const renderDropdownItems = (items, parentLink) => {
  return items.map(item =>
    <LinkContainer key={item.id} to={parentLink + item.link}>
      <NavDropdown.Item>{item.name}</NavDropdown.Item>
    </LinkContainer>
  )
} 

export const renderNavBarTabs = tabs => {
  return tabs.map(tab => {
    if(tab.isDropdown){
      return (
        <NavDropdown title={tab.name} id={tab.id} key={tab.id}>
          {renderDropdownItems(tab.dropdownItems || [], tab.link)}
        </NavDropdown>
      )
    }
    return (
      <LinkContainer key={tab.id} to={tab.link}>
        <Nav.Link>{tab.name}</Nav.Link>
      </LinkContainer>
    )
  })
}

export function toTitleCase(str) {
  return str?.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}