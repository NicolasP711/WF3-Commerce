import BasketList from "../../../components/basket-list/BasketList"

const BasketPage = ({basket, deleteItem, subItem, addItem}) => {

  const amount = basket.reduce((accumulator, item) => accumulator + item.price * item.qty, 0)
  return (
    <section>
      <h2 className="mb-5">Mon panier</h2>
      <BasketList
        basket={basket}
        deleteItem={deleteItem}
        subItem={subItem}
        addItem={addItem}
      />
      {
        basket.length === 0 ? (
          <h4>Votre panier est vide</h4>
        ) : (
          <h2 className="text-end">Total du panier: {amount.toFixed(2)}</h2>
        )
      }
    </section>
  )
}

export default BasketPage
