"use client";
import Container from "@/app/components/layout/Container";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../../../../base/Button";
import Heading from "../../../../base/Heading";
import FormInput from "../../../../base/inputs/AuthFormTextInput";
import AuthModalContainer from "../../ModalContainer";
import RegisterModalSchema from "./LoginModalSchema";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(RegisterModalSchema),
  });

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const { email, password } = data;
    signIn("credentials", { email, password, redirect: false }).then(
      (callback) => {
        setIsLoading(false);
        if (callback?.ok) {
          toast.success("Logged in");
          router.refresh();
          loginModal.onClose();
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      }
    );
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={"Welcome back"}
        subTitle={"Login to your account"}
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
        id="password"
        type="password"
        label="Password"
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
        <div>First time using Airbnb?</div>
        <div
          onClick={onToggle}
          className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
        >
          Create an account!
        </div>
      </div>
    </div>
  );
  if (isLoading) {
    return (
      <Container>
        <div className="mt-[200px]">Loading...</div>
      </Container>
    );
  }
  return (
    <AuthModalContainer
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title={"Login"}
      actionText="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
