import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import validate from './validation'
import { login, loginWithGoogle } from '../../firebase'
import { useHistory } from 'react-router-dom'

const FormLogin = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    onSubmit: values => {
      login(values)
      history.push('/')
    }
  })

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h2 className='mb-5'>Se connecter</h2>
      <Form.Group className='mb-3'>
        <Form.Label>Adresse email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-danger'>
          {formik.touched.email && formik.errors.email && formik.errors.email}
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type='password'
          name='password'
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        <Form.Text className='text-danger'>
          {formik.touched.password &&
            formik.errors.password &&
            formik.errors.password}
        </Form.Text>
      </Form.Group>

      <Button className='me-3' type='submit'>
        Se connecter
      </Button>
      <Button onClick={() => loginWithGoogle(history)} variant='info' type='button'>
        <i className='fab fa-google'></i> Se connecter avec Google
      </Button>
    </Form>
  )
}

export default FormLogin
