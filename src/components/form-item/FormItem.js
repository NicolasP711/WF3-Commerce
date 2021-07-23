import { Button, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import validate from './validation'


const FormItem = ({ addItem }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      image: '',
      description: '',
    },
    validate,
    onSubmit: values => {
      addItem(values)
    }
  })

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    formik

  return (
    <Form className='my-3' onSubmit={handleSubmit}>
      <h2 className='mb-3'>Ajouter un article</h2>

      <Form.Group className='mb-3'>
        <Form.Label>Titre de l'article</Form.Label>
        <Form.Control
          type='text'
          name='title'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.title}
        />
        <Form.Text className='text-danger'>
          {touched.title && errors.title && errors.title}
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Prix de l'article</Form.Label>
        <Form.Control
          type='number'
          name='price'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
        />
        <Form.Text className='text-danger'>
          {touched.price && errors.price && errors.price}
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Image de l'article</Form.Label>
        <Form.Control
          type='url'
          name='image'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.image}
        />
        <Form.Text className='text-danger'>
          {touched.image && errors.image && errors.image}
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Description de l'article</Form.Label>
        <Form.Control
          as='textarea'
          rows={5}
          name='description'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
        />
        <Form.Text className='text-danger'>
          {touched.description && errors.description && errors.description}
        </Form.Text>
      </Form.Group>

      <Button className='me-3' type='submit'>
        Valider
      </Button>
    </Form>
  )
}

export default FormItem
