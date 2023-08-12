import AllProductsTables from "../components/Inventory/AllProductsTables";
import LowStockProducts from "../components/Inventory/LowStockProducts";
import Sidebar from "../components/Sidebar";
import DueDateTable from "../components/Inventory/DueDateTable";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useEffect, useState } from "react";
import { getProducts } from "../components/store/features/inventorySlice";
import SearchBar from "../components/Pacients/SearchBar";
import EditModal from "../components/Inventory/Modals/EditModal";
import PostModal from "../components/Inventory/Modals/PostModal";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showPostModal, setShowPostModal] = useState(false);

  const handleEdit = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  const dispatch = useDispatch();
  const inventoryProducts = useSelector((state) => state.inventory.products);

  const totalProductos = inventoryProducts.length;

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const onPostProducts = () => {
    setShowPostModal(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = inventoryProducts.filter((product) =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-screen overflow-auto bg-secondary-100">
      <div className="lg:w-[20%] m-0 z-50 shadow-lg">
        <Sidebar />
      </div>
      <div className="lg:w-[80%] w-[100vw] mt-10 lg:mt-0 h-[100vh] m-0 lg:flex lg:flex-row flex-col justify-center items-center gap-8 mx-4">
        <section className="flex flex-col justify-center items-center gap-5">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <AllProductsTables
            handleEdit={handleEdit}
            productos={filteredProducts}
          />
          <button
            onClick={onPostProducts}
            className="h-[30%] py-2 px-2 transition-all duration-300 ease-in-out text-white rounded-lg w-[10em] m-auto bg-secondary-200 hover:bg-secondary-300 hover:scale-105"
          >
            Agregar producto
          </button>
        </section>
        <section className=" flex flex-col gap-9 py-10 items-center">
          <article className="flex mt-2 transition-all duration-200 ease-in-out flex-col hover:transform hover:scale-105 mx-auto shadow-2xl whitespace-nowrap shadow-black justify-center bg-primary items-center h-[5%] w-full rounded-lg">
            Cantidad total de productos:
            <strong className="mt-2 text-2xl">{totalProductos}</strong>
          </article>
          <article>
            <div className="mb-3">
              <span className="bg-primary p-1 mb-9 rounded">
                Productos bajo stock
              </span>
            </div>
            {inventoryProducts && (
              <LowStockProducts productos={inventoryProducts} />
            )}
          </article>
          <article className="lg:w-full">
            <div className="mb-3">
              <span className="bg-primary p-1 rounded">
                Productos cerca de vencer
              </span>
            </div>

            {inventoryProducts && (
              <DueDateTable productos={inventoryProducts} />
            )}
          </article>
        </section>
      </div>
      {showModal && selectedRow && (
        <EditModal setShowModal={setShowModal} selectedRow={selectedRow} />
      )}
      {showPostModal && <PostModal setShowPostModal={setShowPostModal} />}
    </div>
  );
};

export default Inventory;
