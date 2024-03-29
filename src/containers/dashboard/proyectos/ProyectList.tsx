import React, { useEffect, useState } from "react";
import { ProyectListContainer, LisContainer, ProyectObject } from "./styles";
import { NavLink } from "react-router-dom";
import { getProyects, getTask } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  setCurrentProyect,
  setActiveProyects,
  setFinishedProyects,
} from "../../../redux/slices/proyects";

const Proyect = (proyecto: any) => {
  const [dataqty, setDataQty] = useState<number>(0);
  const dispatch = useDispatch();
  const handleClick = (proyecto: any) => {
    dispatch(setCurrentProyect(proyecto));
  };
  const handleTaskQty = async () => {
    const res = await getTask(proyecto.proyecto._id);
    setDataQty(res.data.length);
  };
  useEffect(() => {
    handleTaskQty();
  }, [proyecto]);
  return (
    <ProyectObject>
      <NavLink
        to={`/panel/${proyecto.proyecto._id}`}
        onClick={() => {
          handleClick(proyecto.proyecto);
        }}
        className="proyect__item"
      >
        <div>
          <p className="proyect__name">{proyecto.proyecto.nombre}</p>

          <span className="proyect__date">
            Creado el dia:{" "}
            {new Date(proyecto.proyecto.creado).toLocaleDateString()}
          </span>
        </div>

        <span className="proyect__task">
          {dataqty !== 0
            ? `Cantidad de tareas: ${dataqty}.`
            : "El panel no cuenta con tareas."}
        </span>
      </NavLink>
    </ProyectObject>
  );
};

const ProyectList = () => {
  const [load, setLoad] = useState<boolean>(false);
  const proyects = useSelector(
    (state: RootState) => state.proyects.activeproyects
  );
  const dispatch = useDispatch();
  const handleGetProyects = async () => {
    const request = await getProyects();
    if (request.status === 200) {
      setLoad(false);
      dispatch(
        setActiveProyects(
          request.data.filter((item: any) => item.estado === false)
        )
      );
      dispatch(
        setFinishedProyects(
          request.data.filter((item: any) => item.estado === true)
        )
      );
    }
  };
  useEffect(() => {
    setLoad(true);
    handleGetProyects();
  }, []);

  return (
    <ProyectListContainer>
      <LisContainer>
        {load ? (
          <>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
            <div className="skeleton-box"></div>
          </>
        ) : proyects.length === 0 ? (
          <p className="object_list">Todavia no creaste ningun proyecto!</p>
        ) : (
          <>
            {proyects.map((proyecto: any) => (
              <Proyect key={proyecto._id} proyecto={proyecto} />
            ))}
          </>
        )}
      </LisContainer>
    </ProyectListContainer>
  );
};

export default ProyectList;
