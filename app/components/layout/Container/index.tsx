"use client";

interface ContainerProps {
  children: React.ReactNode;
  noCategories?: boolean;
}

const Container = ({ children, noCategories }: ContainerProps) => {
  return (
    <div
      className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 ${
        noCategories ? "-mt-[80px]" : null
      } `}
    >
      {children}
    </div>
  );
};

export default Container;
