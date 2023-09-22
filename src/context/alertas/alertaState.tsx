import React, { useReducer, useEffect } from "react";
import AlertaReducer from "./alertaReducer";
import AlertaContext from "./alertaContext";
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";
import { toast } from "react-toastify";

const AlertaState = (props: any) => {
  const initialState = {
    alerta: null,
  };
  const [state, dispatch] = useReducer(AlertaReducer, initialState);
  const mostrarAlerta = (msg: any, categoria: any) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: { msg, categoria },
    });
  };

  const ocultarAlerta = () => {
    dispatch({
      type: OCULTAR_ALERTA,
    });
  };

  return (
    <AlertaContext.Provider
      value={{
        alerta: state.alerta,
        mostrarAlerta,
        ocultarAlerta,
      }}
    >
      {props.children}
    </AlertaContext.Provider>
  );
};

export default AlertaState;
