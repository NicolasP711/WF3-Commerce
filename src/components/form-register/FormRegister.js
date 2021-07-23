import { Button, Col, Form, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import validate from './validation'
import { register, loginWithGoogle } from '../../firebase'
import { useHistory } from 'react-router-dom'

const FormRegister = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      repeat: '',
      admin: ''
    },
    validate,
    onSubmit: async values => {
      await register(values)
      history.push('/')
    }
  })

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className='mb-5'>S'enregistrer</h2>
      <Row>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type='text'
              name='firstname'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstname}
            />
            <Form.Text className='text-danger'>
              {touched.firstname && errors.firstname && errors.firstname}
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className='mb-3'>
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type='text'
              name='lastname'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastname}
            />
            <Form.Text className='text-danger'>
              {touched.lastname && errors.lastname && errors.lastname}
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className='mb-3'>
        <Form.Label>Adresse email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        <Form.Text className='text-danger'>
          {touched.email && errors.email && errors.email}
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type='password'
          name='password'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        <Form.Text className='text-danger'>
          {touched.password && errors.password && errors.password}
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Répéter le mot de passe</Form.Label>
        <Form.Control
          type='password'
          name='repeat'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.repeat}
        />
        <Form.Text className='text-danger'>
          {touched.repeat && errors.repeat && errors.repeat}
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Check
          type='checkbox'
          label='Admin ?'
          name='admin'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.admin}
        />
      </Form.Group>

      <Button className='me-3' type='submit'>
        S'enregistrer
      </Button>
      <Button onClick={() => loginWithGoogle(history)} variant='info' type='button'>
        <i className='fab fa-google'></i> S'enregistrer avec Google
      </Button>
    </Form>
  )
}

export default FormRegister
