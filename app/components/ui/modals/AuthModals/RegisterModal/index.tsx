"use client";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../../../../base/Button";
import Heading from "../../../../base/Heading";
import FormInput from "../../../../base/inputs/AuthFormTextInput";
import AuthModalContainer from "../AuthModalContainer";
import RegisterModalSchema from "./RegisterModalSchema";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      consfirmPassword: "",
    },
    resolver: yupResolver(RegisterModalSchema),
  });

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(true);
    const { name, email, password } = data;
    axios
      .post("/api/register/", { name, email, password })
      .then(() => registerModal.onClose())
      .catch((error) => toast.error("Encountered with an error"))
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={"Welcome to AirBnb"}
        subTitle={"Create an Account"}
        center={true}
      />
      <FormInput
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <FormInput
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <FormInput
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <FormInput
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        text="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        text="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
          flex items-center justify-center gap-2
          text-neutral-500 text-center font-light
          mt-4 
        "
      >
        <p>Already have an account?</p>
        <span
          onClick={onToggle}
          className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
        >
          Log in
        </span>
      </div>
    </div>
  );
  return (
    <AuthModalContainer
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={"Register"}
      actionText="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
