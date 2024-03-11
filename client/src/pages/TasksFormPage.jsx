import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {createTask, deleteTask, updateTask, getTask} from '../api/tasks.api';
import {useNavigate, useParams} from 'react-router-dom';
import {toast} from "react-hot-toast";

export function TasksFormPage() {
  const {register, handleSubmit, formState: {
      errors
    }, setValue} = useForm();
  const navigate = useNavigate();
  const params = useParams()
  console.log(params)
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      console.log(data)
      await updateTask(params.id, data);
      toast.success('Tarea actualizada', {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }})
    } else {
      await createTask(data);
      toast.success('Tarea creada con éxito', {
        duration: 2000,
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff"
        }

      });
    } navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const res = await getTask(params.id);
        console.log(res);
        setValue('title', res.data.title)
        setValue('description', res.data.description)
      }
    }
    loadTask();
  }, [])

  return (
    <div className="max-w-xl m-auto">
      <form onSubmit={onSubmit}>
        <input type="text" name="title" placeholder="Title" {...register("title",{required:true})}
        className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
        /> {
        errors.title && <p>Este campo es requerido</p>
      }
        <textarea className="bg-zinc-700 p-3 rounded-lg block w-full mb-3" name="description" rows="3" placeholder="Description" {...register("description",{required:true})}/> {
        errors.description && <p>Este campo es requerido</p>
      }
        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
      </form>
      {
      params.id && <button className="bg-red-500 p-3 rounded-lg w-48 mt-3"
      
      onClick={
        async () => {
          const accepted = window.confirm('Are you sure?')
          if (accepted) {
            await deleteTask(params.id)
            toast.success('Tarea eliminada con éxito', {
              duration: 2000,
              position: "bottom-right",
              style: {
                background: "#101010",
                color: "#fff"
              }
      
            });
            navigate('/tasks');
          }
        }
      }>Delete</button>
    } </div>
  );
}
