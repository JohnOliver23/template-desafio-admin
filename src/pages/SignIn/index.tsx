import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/auth";
import { Button, Input } from "@chakra-ui/react";
import styles from "./styles.module.scss";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const [isLoading, setIsloading] = useState(false);
  //Yup
  const userSchema = Yup.object({
    email: Yup.string()
      .required("O email é obrigatório")
      .email("Informe um email válido"),
    password: Yup.string().required("A senha é obrigatória"),
  });
  //Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      setIsloading(true);
      await signIn({
        email: values.email,
        password: values.password,
      });
      setIsloading(false);
    },
  });
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Faça Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <Input
            _focus={{
              border: "2px",
              borderColor: "var(--chakra-colors-purple-500)",
              boxShadow: "0 0 0 1px var(--chakra-ui-focus-ring-color)",
            }}
            label="Email"
            name="email"
            placeholder="Digite seu Email"
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.email && formik.touched.email}
            errorBorderColor="red.400"
            value={formik.values.email}
            size="lg"
          />
          <div className={styles.containerError}>
            {formik.errors.email && formik.touched.email ? (
              <p className={styles.labelError}>{formik.errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <Input
            _focus={{
              border: "2px",
              borderColor: "var(--chakra-colors-purple-500)",
              boxShadow: "0 0 0 1px var(--chakra-ui-focus-ring-color)",
            }}
            label="Senha"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.password && formik.touched.password}
            errorBorderColor="red.400"
            size="lg"
            value={formik.values.password}
          />
          <div className={styles.containerError}>
            {formik.errors.password && formik.touched.password ? (
              <p className={styles.labelError}>{formik.errors.password}</p>
            ) : (
              ""
            )}
          </div>
          <Button
            width="100%"
            type="submit"
            variant="solid"
            colorScheme="purple"
            color="#fff"
            isLoading={isLoading}
            loadingText="Submitting"
          >
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
