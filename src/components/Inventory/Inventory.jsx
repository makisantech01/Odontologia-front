import AllProductsTables from "./AllProductsTables";
import LowStockProducts from "./LowStockProducts";
import Sidebar from "../Sidebar";
import DueDateTable from "./DueDateTable";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { getProducts } from "../store/features/inventorySlice";
import SearchBar from "../Pacients/SearchBar";
const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const dispatch = useDispatch();
  const inventoryProducts = useSelector((state) => state.inventory.products);
  console.log("🚀 ~ file: Inventory.jsx:12 ~ Inventory ~ productos:", inventoryProducts);
  const totalProductos = inventoryProducts.length

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  return (
    <main className="flex bg-cover flex-col h-screen w-screen overflow-x-hidden bg-secondary-100">
      <div className="absolute w-1/5">
        <Sidebar />
      </div>
      <div className="ml-[20%] m-auto gap-36 flex flex-row">
      <section className="flex flex-col m-auto ml-[10%] gap-5 ">
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          {inventoryProducts && <AllProductsTables productos={inventoryProducts} />}
          <button className=" h-[30%] transition-all duration-300 ease-in-out text-white rounded-lg w-[20%] m-auto bg-secondary-200 hover:bg-secondary-300 hover:scale-105">Agregar producto</button>
        </section>
        <section className="flex m-auto mr-7 flex-col gap-9 items-center">
        <article className="flex transition-transform duration-200 ease-in-out flex-col hover:transform hover:scale-105 mx-auto shadow-2xl shadow-black justify-center bg-primary items-center h-[10%] w-[60%] rounded-md">
          Cantidad total de productos:
          <strong>{totalProductos}</strong>
        </article>
          <article>
            <div className="mb-1"> <span className="bg-primary p-1 mb-9 rounded">Productos bajo stock</span></div>
            {inventoryProducts && <LowStockProducts productos={inventoryProducts} />}
          </article>
          <article className="">
            <div className="mb-1"><span className="bg-primary p-1 rounded">
              Productos cerca de vencer
            </span></div>
         
            <DueDateTable productos={inventoryProducts} />
          </article>
        </section>

      </div>
    </main>
  );
};

export default Inventory;
