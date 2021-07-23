import { Fragment, useState } from 'react'
import { Alert, Button, Modal } from 'react-bootstrap'
import FormItem from '../../components/form-item/FormItem'
import TableItems from '../../components/table-items/TableItems'
import { db } from '../../firebase'
import { v4 as uuidv4 } from 'uuid'
import './admin-page.css'
import { Redirect } from 'react-router-dom'

const AdminPage = ({ list, user }) => {
  const [showForm, setShowForm] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [id, setId] = useState(null)

  if(!user || !user.admin){
    return <Redirect to={{path: '/'}} />
  }

  const addItem = async item => {
    try {
      await db.collection('items').doc(uuidv4()).set(item)
    } catch (err) {
      console.error(err.message)
    }
  }

  const deleteItem = async () => {
    try {
      await db.collection('items').doc(id).delete()
      setShowModal(false)
    } catch (err) {
      console.error(err.message)
    }
    // const newList = list.filter(item => item.id !== id)
    // setList(newList)
    // setShowModal(false)
  }

  return (
    <Fragment>
      <h2>Page Administrateur</h2>

      <TableItems list={list} setShowModal={setShowModal} setId={setId} />

      <Button onClick={() => setShowForm(!showForm)}>Ajouter un article</Button>

      {showForm && <FormItem addItem={addItem} />}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Alert variant='primary'>
          <div className='d-flex justify-content-between align-items-center'>
            <p className='m-0 p-0'>Etes-vous sûr ?</p>
            <div>
              <Button onClick={deleteItem} variant='success'>
                Oui
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className='ms-2'
                variant='danger'
              >
                Non
              </Button>
            </div>
          </div>
        </Alert>
      </Modal>
    </Fragment>
  )
}

export default AdminPage
