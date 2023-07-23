import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postProducts } from "../../store/features/inventorySlice";
import Swal from "sweetalert2";
const PostModal = ({ setShowPostModal }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const handleBlur = (fieldName) => {
    trigger(fieldName);
  };

  const onSubmit = async (data, errors) => {
    try {
      // Transformar la fecha de vencimiento
      const fechaVencimiento = new Date(data.vencimiento);
      const dd = String(fechaVencimiento.getUTCDate()).padStart(2, "0");
      const mm = String(fechaVencimiento.getMonth() + 1).padStart(2, "0");
      const yyyy = fechaVencimiento.getFullYear();

      // Crear la fecha en el formato deseado (dd/mm/yyyy)
      const fechaFormateada = `${dd}/${mm}/${yyyy}`;

      // Actualizar el valor de la fecha de vencimiento en los datos
      const newData = { ...data, vencimiento: fechaFormateada };
      const result = await Swal.fire({
        title: "¿Quieres crear este producto? Esta es la información",
        html: `
          <div>Nombre: <strong>${newData.nombre}</strong></div>
          <div>Cantidad: <strong>${newData.cantidad}</strong></div>
          <div>Vencimiento: <strong>${newData.vencimiento}</strong></div>
          <div>Lote: <strong>${newData.lote}</strong></div>
          <div>Stock Mínimo: <strong>${newData.stockMinimo} </strong></div>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, crear",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        setShowPostModal(false);
        const response = await dispatch(postProducts(newData));
      } else {
        Swal.fire("No se realizó la operación", "", "info");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className=" bg-primary w-[20em] rounded-lg flex flex-col items-center py-3">
        <h2 className="flex relative justify-center text-3xl font-bold py-4">
          Creando producto
        </h2>
        <section>
          <form>
            <section className="flex flex-col justify-center items-center gap-5 mt-[10%]">
              <article className="flex flex-col gap-2 w-[90%]">
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombre"
                  className="bg-slate-200  rounded-lg pl-4"
                  {...register("nombre", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.nombre && (
                  <p className="text-red-500">{errors.nombre.message}</p>
                )}
                <input
                  type="number"
                  min="0"
                  id="cantidad"
                  placeholder="Cantidad"
                  className="bg-slate-200  rounded-lg pl-4"
                  {...register("cantidad", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.cantidad && (
                  <p className="text-red-500">{errors.cantidad.message}</p>
                )}
                <input
                  type="number"
                  min="0"
                  id="stockMinimo"
                  className="bg-slate-200 rounded-lg pl-4"
                  placeholder="Stock mínimo"
                  {...register("stockMinimo", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.stockMinimo && (
                  <p className="text-red-500">{errors.stockMinimo.message}</p>
                )}
              </article>
              <article className="flex flex-col gap-2 w-[90%]">
                <input
                  type="text"
                  id="lote"
                  placeholder="Lote"
                  className="bg-slate-200 rounded-lg pl-4"
                  {...register("lote", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.lote && (
                  <p className="text-red-500">{errors.lote.message}</p>
                )}
                <label htmlFor="">Fecha de vencimiento</label>
                <input
                  type="date"
                  id="vencimiento"
                  placeholder="Vencimiento"
                  className="bg-slate-200  rounded-sm"
                  {...register("vencimiento", {
                    required: "Campo obligatorio",
                  })}
                />
                {errors.vencimiento && (
                  <p className="text-red-500">{errors.vencimiento.message}</p>
                )}
              </article>
            </section>
          </form>
        </section>
        <div className="flex my-4 justify-center gap-4 items-center">
          <button
            className="p-1 bg-red-700 hover:bg-red-900 rounded-lg py-2 px-2"
            onClick={() => setShowPostModal(false)}
          >
            Cancelar
          </button>
          <button
            className="p-1 bg-blue-500 hover:bg-blue-900 rounded-lg py-2 px-2 text-white"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Crear producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
