import React, { useEffect, useState } from 'react';
import DataModal from '../DataModal';
import { renderInvoiceActionButton } from '../../global/helpers';
import DataTable from '../DataTable';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoices, updateInvoice } from '../../app/services/apiService';
import InvoiceForm from './InvoiceForm';
import { INVOICE_COLUMNS } from '../../global/constants/columnDefs';
import { useAuth } from '../../app/auth/AuthContext';
import { INVOICE_STATUS_VERBS, USER_BORROWER } from '../../global/constants';

const Invoices = ({headerText}) => {
  const dispatch = useDispatch()
  const { data: invoices, isLoading, isError, error } = useSelector(store => store.invoices)
  const { currentUser } = useAuth()
  const isBorrower = currentUser?.role_type === USER_BORROWER

  useEffect(() => {
    dispatch(getInvoices({ [`${currentUser?.role_type}_id`]: currentUser?.id }))
  }, [dispatch])

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [invoiceNewStatus, setInvoiceNewStatus] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const columns = INVOICE_COLUMNS.concat(
    {
      Header: 'Actions',
      accessor: row => row,
      Cell:({value}) => (
        renderInvoiceActionButton({
          role: currentUser?.role_type,
          status: value.status,
          handleAssignLender(){
            setActiveInvoice(value)
            setShowInvoiceModal(true)
          },
          handleStatusUpdateConfirm(newStatus){
            setActiveInvoice(value)
            setInvoiceNewStatus(newStatus)
            setShowConfirmModal(true)
          },
        })
      )
    }
  )

  return (
    <div>
      <h1>{headerText}</h1>
      {isBorrower && <Button variant='success' onClick={async ()=>{
        setShowInvoiceModal(true)
        setActiveInvoice(null)
      }} disabled={isLoading}>Create Invoice</Button>}
      <DataTable columns={columns} data={invoices} emptyMessage={isBorrower ? <>No Invoices Here. Get Started by clicking <b>Create Invoice</b></> : <>No Invoice Requests Received Yet</>} />
      <DataModal
        show={showInvoiceModal}
        handleToggle={setShowInvoiceModal}
        headerText='Create Invoice'
        bodyContent={<InvoiceForm handleModalToggle={setShowInvoiceModal} invoice={activeInvoice} />}
      />
      <DataModal
        show={showConfirmModal}
        handleToggle={setShowConfirmModal}
        headerText='Sure?'
        bodyContent={<p>Are you sure you want to {INVOICE_STATUS_VERBS[invoiceNewStatus]} the invoice no. <b>{activeInvoice?.invoice_number}</b> with amount <b>${activeInvoice?.invoice_amount}</b>?</p>}
        okayText='Yes'
        handleOkay={()=>{
          dispatch(updateInvoice({ ...activeInvoice, status: invoiceNewStatus }))
        }}
        cancelText='No'
        hasFooter
      />
    </div>
  );
};

export default Invoices;