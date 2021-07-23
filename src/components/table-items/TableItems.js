import { Table } from 'react-bootstrap'

const TableItems = ({ list, setShowModal, setId }) => {
  return (
    <Table className='my-5' striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nom de l'article</th>
          <th>Prix de l'article</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
        {!list ? (
          <h2>Loading ...</h2>
        ) : (
          list.map(({ id, title, price }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{price}€</td>
              <td
                onClick={() => {
                  setId(id)
                  setShowModal(true)
                }}
                className='btn__delete text-center'
              >
                <i className='fas fa-trash'></i>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}

export default TableItems
