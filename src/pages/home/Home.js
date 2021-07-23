import { Row, Col } from 'react-bootstrap'
import CardItem from '../../components/card-item/CardItem'

function Home({ list }) {
  return (
    <Row>
      {!list ? (
        <h2>Loading</h2>
      ) : (
        list.map(item => (
          <Col key={item.id} className='mb-3' xs={12} sm={6} md={4} lg={3}>
            <CardItem {...item} />
          </Col>
        ))
      )}
    </Row>
  )
}

export default Home
