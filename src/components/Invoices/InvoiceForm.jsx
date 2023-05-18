import { Formik, Field, Form } from 'formik';
import { Button, Form as FormComp } from 'react-bootstrap';
import { object, number, date } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { assignInvoice, createInvoice, getUsers, updateInvoice } from '../../app/services/apiService';
import { useAuth } from '../../app/auth/AuthContext';
import { useEffect } from 'react';
import { INVOICE_APPROVED } from '../../global/constants';

const InvoiceForm = ({handleModalToggle, invoice}) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth()
  const isUpdating = Boolean(invoice)

  const { data: lenders, isLoading, isError, error } = useSelector(store => store.users)

  useEffect(() => {
    dispatch(getUsers({ role_type: 'lender' }))
  }, [dispatch])

  if(isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Formik
      initialValues={{invoice_amount: 0, invoice_due_date: '', status: 'created', borrower_id: currentUser.id, lender_id: '', ...invoice}}
      validationSchema={
        object({
          invoice_amount: number().required().positive(),
          invoice_due_date: date().required(),
          lender_id: isUpdating ? number().required() : number()
        })
      }
      onSubmit={(values) => {
        try {
          if(isUpdating){
            dispatch(updateInvoice({ ...values, status: INVOICE_APPROVED}))
            dispatch(assignInvoice(values))
          } else {
            dispatch(createInvoice(values));
          }
          handleModalToggle(false)
        } catch (error) {
          console.error('Failed to create post:', error);
        }
      }}
    >
      {({
        values,
        errors,
        isSubmitting
      })=>(
        <Form>
          {<p><b>Invoice Number:</b> {values.invoice_number || 'None'}</p>}
          {isUpdating &&
            <>
              <p><b>Amount:</b> {values.invoice_amount || 'None'}</p>
              <p><b>Due Date:</b> {values.invoice_due_date || 'None'}</p>
            </>
          }
          {!values.lender && isUpdating
              ? <>
                  <FormComp.Label htmlFor={'lender_id'}>Assigned Lender: </FormComp.Label>
                  <Field
                    as="select"
                    name="lender_id"
                    id="lender_id"
                    className='form-control mb-3'
                  >
                    <option value=''>None</option>
                    {lenders.map(lender => {
                      return <option key={lender.id} value={lender.id}>{lender.name}</option>
                    })}
                  </Field>
                  <p className='text-danger'>{errors.lender_id}</p>
                </>
              : <p><b>Assigned Lender:</b> {values.lender?.name || 'None'}</p>
          }
          {!isUpdating &&
            <>
              <FormComp.Label htmlFor={'invoice_amount'}>Amount: </FormComp.Label>
              <Field
                type="number"
                name="invoice_amount"
                id="invoice_amount"
                placeholder="Enter Amount"
                className='form-control'
              />
              <p className='text-danger'>{errors.amount}</p>
              <FormComp.Label htmlFor={'invoice_due_date'}>Due Date: </FormComp.Label>
              <Field
                type="date"
                name="invoice_due_date"
                id="invoice_due_date"
                placeholder="Select Due Date"
                className='form-control'
              />
              <p className='text-danger'>{errors.invoice_due_date}</p>
            </>
          }
          <Button type="submit" disabled={isSubmitting}>{isUpdating ? 'Assign' : 'Create'}</Button>{' '}
          <Button type="button" variant='secondary' onClick={()=>handleModalToggle(false)}>Cancel</Button>
        </Form>
      )}
    </Formik>
  )
}

export default InvoiceForm