import React, { useContext, useState } from "react";
import ProyectoContext from "../../../../context/proyects/proyectoContext";
import styled from "@emotion/styled";

const NewProyectContainer = styled.div`
  background-color: #f3f3f3;
  //min-height: 50vh;
  height: 100%;
  width: 100%;
  border-radius: 0 0 35px 35px;
  padding: 0.5rem;
  position: absolute;
  @media (min-width: 768px) {
    z-index: 0;
    transition: all 1s ease-in-out;
    transform: translateX(-50vw);
    border-radius: 0 25px 25px 0;
    //border: 1px solid red;
    width: 20vw;  
    min-width: 250px;
    left: 0;
    top: 0;
    box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.24);
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 35px;
  outline: none;
  border: none;
  &:first-child {
    background-color: white;
    padding-left: 20px;
    &:focus {
      border: 1px solid #f02d7b;
    }
  }
`;
const Text = styled.textarea`
  resize: none;
  min-height: 20vh;
  border-radius: 35px;
  padding: 1rem;
  outline: none;
  font-family: Helvetica, sans-serif;
  &:focus {
    border: 1px solid #f02d7b;
  }
`;
const ErrorMessage = styled.p``;
const Submit = styled.input`
  background-color: #f02d7b;
  color: white;
  width: 80%;
  align-self: center;
`;
const NewProyect = () => {
  const [proyect, createProyect] = useState({
    nombre: "",
    desc: "",
  });

  const proyectoContext = useContext(ProyectoContext);
  const {
    panel,
    errorformulario,
    agregarProyecto,
    validarFormulario,
  } = proyectoContext;

  const { nombre, desc } = proyect;

  const handleChange = (e) => {
    createProyect({
      ...proyect,
      [e.target.name]: e.target.value,
    });
  };
  //enviar lo que envia el usuario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === "") {
      validarFormulario();
      return;
    }
    createProyect({
      nombre: "",
      desc: "",
    });
    agregarProyecto(proyect);
    // //console.log(proyect)
  };

  return (
    // <div className={panel ? "dashboard_panel active" : "dashboard_panel"}>
    <NewProyectContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre del proyecto"
          name="nombre"
          value={nombre}
          onChange={handleChange}
          className="NewProyect_Form_input"
        />
        <Text
          type="text"
          maxLength="120"
          placeholder="Descripcion breve"
          name="desc"
          value={desc}
          onChange={handleChange}
          className="NewProyect_Form_TextArea"
        />
        {errorformulario ? (
          <ErrorMessage className="input_errorP">El nombre es necesario!</ErrorMessage>
        ) : null}
        <Submit type="submit" value="Guardar" className="NewProyect_Btn" />
      </Form>
    </NewProyectContainer>
  );
};

export default NewProyect;
