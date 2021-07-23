import { Col, Row, Button } from "react-bootstrap"



const BasketItem = ({item, deleteItem, subItem, addItem}) => {

  const{id, image, title, qty, price} = item

  return (
    <Row className="p-4" style={{boxShadow: "0 0 20px rgba(0,0,0,0.08)"}}>
      <Col xs md={3}>
        <img style={{maxHeight: 200}} src={image} alt={title}/>
      </Col>
      <Col xs md={9}>
        <h4>{title}</h4>
        <h5 className="lead my-3">Prix unitaire: <span className="text-danger">{price}€</span></h5>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Button onClick={() => subItem(item)} style={{width: 50}} >-</Button>
            <p className="mb-0 mx-3">Quantité: {qty}</p>
            <Button onClick={() => addItem(item)} style={{width: 50}} >+</Button>
          </div>
          <Button onClick={() => deleteItem(id)} >Supprimer cet article</Button>
        </div>
      </Col>
    </Row>
  )
}

export default BasketItem
