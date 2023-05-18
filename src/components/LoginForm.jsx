import { Formik, Field, Form } from 'formik';
import { Button, Form as FormComp } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { useAuth } from '../app/auth/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_LENDER } from '../global/constants';

const LoginForm = () => {
  const { login } = useAuth();
  const dispatch = useDispatch()
  const {token, isLoading, isAuthenticated, user, error} = useSelector(store => store.auth)

  if(!isLoading && isAuthenticated) {
    toast.success('logged in successfully!')
    return <Navigate to={user?.role_type === USER_LENDER ? '/invoice_requests' : '/invoices'} />
  }

  return (
    <Formik
      initialValues={{
        user: {
          email: '', password: ''
        }
      }}
      validationSchema={
        object({
          user: object({
            email: string().required(),
            password: string().required()
          })
        })
      }
      onSubmit={values => {
        try {
          login(values);
        } catch (error) {
          toast.error(error)
          console.error('Failed to Login', error);
        }
      }}
    >
    {({
      values,
      errors,
      isSubmitting
    })=>(
        <Form>
          <FormComp.Group className="mb-3">
            <FormComp.Label>Email address</FormComp.Label>
            <Field type="email" placeholder="Enter email" name="user.email" className='form-control' />
            <p className='text-danger'>{errors.user?.email}</p>
          </FormComp.Group>

          <FormComp.Group className="mb-3">
            <FormComp.Label>Password</FormComp.Label>
            <Field type="password" placeholder="Password" name="user.password" className='form-control' />
            <p className='text-danger'>{errors.user?.password}</p>
          </FormComp.Group>
          <Button variant="primary" type="submit" disabled={isLoading}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm