import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormularioContainer,
  Content,
  Titulo,
  InputField,
  Button,
  ButtonSec,
} from "./styles";
import { Authwraper } from "../styles";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginuser, LoginCredentials } from "../../../services";
import { setAuthenticated, setCurrentUser } from "../../../redux/slices/user";
import { RootState } from "../../../redux/store";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { movePanelAuth } from "../../../redux/slices/ui";

type ToastType = "success" | "info" | "warning" | "error";

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [toastId, setToastId] = useState<React.ReactText | null>(null);

  const [user, setUser] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const { email, password } = user;

  const dispatch = useDispatch();
  const autenticathed = useSelector(
    (state: RootState) => state.user.autenticathed,
  );
  const navigate = useNavigate();
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputFocus2 = () => {
    setIsFocused2(true);
  };

  const handleInputBlur2 = () => {
    setIsFocused2(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (email.trim() === "" || password.trim() === "") {
      showNotification(
        "Todos los campos son necesarios",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        },
        "warning",
      );
      setLoading(false);
      return;
    }
    const request = await loginuser(user);

    if (request.status === 200) {
      setLoading(false);
      dispatch(setAuthenticated(true));
      dispatch(
        setCurrentUser({
          id: request.response._id,
          name: request.response.nombre,
          email: request.response.email,
        }),
      );

      showNotification(
        "Ingresando a su cuenta, bienvenido.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        },
        "success",
      );
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } else {
      showNotification(
        request.mensaje?.msg,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        },
        "error",
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (autenticathed) {
      navigate("/");
    }
  }, [autenticathed, navigate]);

  const showNotification = (
    msg: string,
    body: ToastOptions,
    type: ToastType,
  ) => {
    const id = toast[type](msg, body);
    setToastId(id);
  };

  const clearNotification = () => {
    if (toastId) {
      toast.dismiss(toastId);
      setToastId(null);
    }
  };
  return (
    <div>
      <ToastContainer />
      <Authwraper>
        <FormularioContainer>
          <div
            style={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Titulo>Iniciar Sesion</Titulo>

            <InputField isFocused={isFocused}>
              <FaUserAlt className={isFocused ? "focused" : ""} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Nombre de usuario o Email"
                onFocus={() => handleInputFocus()}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitLogin(e);
                  }
                }}
              />
            </InputField>

            <InputField isFocused={isFocused2}>
              <FaLock className={isFocused2 ? "focused" : ""} />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                onFocus={() => handleInputFocus2()}
                onBlur={handleInputBlur2}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitLogin(e);
                  }
                }}
                placeholder="Contraseña"
              />
            </InputField>
            <Button
              type="button"
              value="Entrar"
              disabled={loading}
              onClick={(e) => {
                handleSubmitLogin(e);
              }}
            />
          </div>

          <Content>
            <h3>¿Nuevo aqui?</h3>
            <p>
              Crea una cuenta y comienza a planificar tus tareas en los
              paneles.{" "}
            </p>
            <ButtonSec
              onClick={() => {
                clearNotification();
                dispatch(movePanelAuth());
              }}
              id="sing-up-btn"
              value="Registrarse"
            />
          </Content>
        </FormularioContainer>
        <div className="image_form"></div>
      </Authwraper>
    </div>
  );
};

export default Login;
