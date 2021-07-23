import BasketItem from "../basket-item/BasketItem"

const BasketList = ({basket, deleteItem, subItem, addItem}) => {
    return (
        <section className="my-5">
            {
                basket.map(item =>(

                 <BasketItem key={item.id} item={item} deleteItem={deleteItem} subItem={subItem} addItem={addItem} />
                 ))
            }
        </section>
    )
}

export default BasketList