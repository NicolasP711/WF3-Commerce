import { Button, Row, Col } from 'react-bootstrap'
import { useParams, useHistory } from 'react-router-dom'

const SinglePage = ({ list, addItem }) => {
  const params = useParams()
  const history = useHistory()
  const itemFound = list.find(item => item.id.toString() === params.id)
  const { title, image, price, description } = itemFound

  return (
    <Row>
      <Col md={4}>
        <img
          src={image}
          alt={title}
          style={{ maxHeight: 300, margin: '0 auto' }}
        />
      </Col>
      <Col md={8}>
        <h2>{title}</h2>
        <p className='my-5'>{description}</p>
        <p className='mb-5 lead'>{price + '€'}</p>
        <Button onClick={() =>
          {
            addItem(itemFound)
            history.push('/basket')
            }}>Ajouter au panier</Button>
        <Button onClick={() => history.goBack()} variant='link'>
          Retour
        </Button>
      </Col>
    </Row>
  )
}

export default SinglePage
