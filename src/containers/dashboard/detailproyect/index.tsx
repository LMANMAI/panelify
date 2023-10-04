import React, { useContext, useEffect, useState } from "react";
import TaskContext from "../../../context/task/taskContext";
import ProyectoContext from "../../../context/proyects/proyectoContext";
import { BsChevronLeft, BsGear } from "react-icons/bs";
import { FormTask, TaskList } from "./auxiliars";
import { FormTaskContainer, FormConfigMenu } from "./styles";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenMenu, setBgUi, setEditMode } from "../../../redux/slices/ui";
import { proyectoActual } from "../../../redux/slices/proyects";

const Task = (tarea: any) => {
  const dispatch = useDispatch();
  const { eliminarTarea, obtenerTareas, actualizarTask, tareaActual } =
    useContext(TaskContext);

  const { terminarProyecto, eliminarProyecto } = useContext(ProyectoContext);
  //extraigo el proyecto activo para tener la referencia cuando actualice los proyectos

  const openmenu = useSelector((state: RootState) => state.ui.openmenu);
  const bg = useSelector((state: RootState) => state.ui.editmode);
  const proyectoactivo = useSelector(
    (state: RootState) => state.proyects.proyectoactivo
  );
  const [proyectname, setProyectName] = useState<string>(proyectoactivo.nombre);

  useEffect(() => {
    obtenerTareas(proyectoactivo._id);
  }, []);
  const handleDelteTask = (id: any) => {
    eliminarProyecto(proyectoactivo._id);
    // obtenerTareas(proyectoactivo._id);
  };
  const cambiarEstadoTarea = (tarea: any) => {
    if (tarea.estado) {
      tarea.estado = false;
    } else {
      tarea.estado = true;
    }
    actualizarTask(tarea);
  };
  const handleChange = (e: any) => {
    setProyectName(e.target.value);
    const updatedProyecto = {
      ...proyectoactivo,
      nombre: e.target.value,
    };
    dispatch(proyectoActual(updatedProyecto));
  };

  const handleEditMode = () => {
    dispatch(setBgUi(true));
    dispatch(setEditMode(true));
  };

  return (
    <FormTaskContainer
      onClick={() => {
        if (openmenu) {
          dispatch(setOpenMenu(false));
        }
      }}
    >
      <div className="form__task">
        <div className="form__task_header">
          <button
            title="Regresar al menu anterior."
            className="form__task_btn"
            onClick={() => {
              window.history.back();
            }}
          >
            <BsChevronLeft />
          </button>
          <h3 className="formt__task_title">
            <input
              type="text"
              name="nombre"
              id="input__edit"
              value={proyectname}
              onChange={(e) => handleChange(e)}
              disabled={!bg}
              className={`form__input ${bg ? "edit__mode" : ""}`}
            />
            <button
              className={`edit__mode_button ${bg ? "btn_edit" : ""}`}
              onClick={() => {
                dispatch(setBgUi(false));
                dispatch(setEditMode(false));

                terminarProyecto(proyectoactivo);
              }}
              title="Guardar cambios en la edición"
            >
              Guardar cambios
            </button>
          </h3>
          <div style={{ position: "relative" }}>
            <button
              title="Opciones del proyecto."
              className={`form__task_btn options ${openmenu ? "picked" : ""}`}
              onClick={() => {
                dispatch(setOpenMenu(!openmenu));
              }}
            >
              <BsGear />
            </button>
            <FormConfigMenu openmenu={openmenu}>
              <li
                onClick={() => {
                  handleEditMode();
                }}
              >
                Cambiar nombre del proyecto
              </li>
              <li onClick={() => {}}>Agregar descripción</li>
              <li
                onClick={() => {
                  handleDelteTask(tarea._id);
                }}
              >
                Eliminar proyecto
              </li>

              <li
                onClick={() => {
                  terminarProyecto(proyectoactivo);
                }}
              >
                Finalizar proyecto
              </li>
            </FormConfigMenu>
          </div>
        </div>
        <FormTask />
      </div>
      <TaskList />
    </FormTaskContainer>
  );
};

export default Task;
