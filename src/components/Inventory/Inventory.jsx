import AllProductsTables from "./AllProductsTables";
import { productos } from "./fakeData";
import LowStockProducts from "./LowStockProducts";
import Sidebar from "../Sidebar";
import DueDateTable from "./DueDateTable";
const Inventory = () => {
  const totalProductos = productos.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <main className="flex bg-cover flex-col h-screen w-screen gap-6 overflow-x-hidden bg-secondary-100">
      <div className="absolute w-1/5">
        <Sidebar />
      </div>
      <div className="ml-[20%]">
        <section className="mx-auto mt-[2%] w-full flex flex-row justify-center">
          <article>
            <span className="bg-primary rounded">Productos bajo stock</span>
            <LowStockProducts />
          </article>
          <article className="ml-[18em]">
            <span className="bg-primary rounded">
              Productos cerca de vencer
            </span>
            <DueDateTable />
          </article>
        </section>
        <article className="flex flex-col hover:transform hover:scale-105 mx-auto mt-[5%] mb-[5%] shadow-2xl shadow-black justify-center bg-primary items-center h-[10%] w-[20%] rounded-md">
          Stock total de productos:
          <strong>{totalProductos}</strong>
        </article>
        <section className="mx-auto w-1/2 mb-[5%]">
          <AllProductsTables />
        </section>
      </div>
    </main>
  );
};

export default Inventory;
