import React from 'react'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import {postProducts } from '../../store/features/inventorySlice';
import Swal from 'sweetalert2'
const PostModal = ({setShowPostModal}) => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
      } = useForm();
    
      const onSubmit = async (data) => {
        try {

    // Transformar la fecha de vencimiento
    const fechaVencimiento = new Date(data.vencimiento);
    const dd = String(fechaVencimiento.getDate()).padStart(2, '0');
    const mm = String(fechaVencimiento.getMonth() + 1).padStart(2, '0');
    const yyyy = fechaVencimiento.getFullYear();

    // Crear la fecha en el formato deseado (dd/mm/yyyy)
    const fechaFormateada = `${dd}/${mm}/${yyyy}`;

    // Actualizar el valor de la fecha de vencimiento en los datos
    const newData = { ...data, vencimiento: fechaFormateada };
    const result = await Swal.fire({
        title:"¿Quieres crear este producto? Esta es la información" ,
        html: `
    <div>Nombre: <strong>${newData.nombre}</strong></div>
    <div>Cantidad: <strong>${newData.cantidad}</strong></div>
    <div>Vencimiento: <strong>${newData.vencimiento}</strong></div>
    <div>Lote: <strong>${newData.lote}</strong></div>
    <div>Stock Mínimo: <strong>${newData.stockMinimo} </strong></div>
  `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      });
      if (result.isConfirmed) {
        setShowPostModal(false)
        const response = await dispatch(postProducts(newData));
      } else {
        Swal.fire('No se realizó la operación', '', 'info')
      }
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm">
    <div className="bg-white border-solid border-primary border-2 h-[50%] w-[50%] rounded flex flex-col items-center">
      <h2 className="flex justify-center text-xl">Creando producto</h2>
      <section>
        <form>
        <section className='flex flex-row justify-center items-center gap-5 mt-[10%]'>
         <article className='flex flex-col gap-1 w-[40%]'>
            <label htmlFor="">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            className='bg-slate-300 border-solid border rounded-sm border-black'
            {...register("nombre")}
          />
          <label htmlFor="">Cantidad</label>
          <input
            type="number"
            min="0"
            id="cantidad"
            placeholder="Cantidad"
            className='bg-slate-300 border-solid border rounded-sm border-black'
            {...register("cantidad")}
          />
          <label htmlFor="">Stock minimo</label>
          <input
            type="number"
            min="0"
            id="stockMinimo"
            className='bg-slate-300 border-solid border rounded-sm border-black'
            placeholder="Stock minimo"
            {...register("stockMinimo")}       
          />
        </article>
        <article className='flex flex-col gap-1 w-[40%]'>
        <label htmlFor="">Lote</label>
        <input
            type="text"
            id="lote"
            placeholder="Lote"
            className='bg-slate-300 border-solid border rounded-sm border-black'
            {...register("lote")}
          />
          <label htmlFor="">Fecha de vencimiento</label>
          <input
  type="date"
  id="vencimiento"
  placeholder="vencimiento"
  className='bg-slate-300 border-solid border rounded-sm border-black'
  {...register("vencimiento")}       
/>
        </article>
       </section>
        </form>
      </section>
      <div className='flex mt-auto mb-[5%] justify-center gap-4 items-center'>
      <button className="p-1 bg-red-900 hover:bg-red-600 rounded-lg" onClick={() => setShowPostModal(false)}>Cancelar</button>
      <button
       className="p-1 bg-blue-500 hover:bg-blue-900 rounded-lg" 
       type='submit'
       onClick={handleSubmit(onSubmit)}
       > Crear producto </button>
      </div>
    </div>
  </div>
  )
}

export default PostModal