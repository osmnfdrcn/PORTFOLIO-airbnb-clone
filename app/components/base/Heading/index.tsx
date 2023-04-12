"use client";
type HeadingProps = {
  title: string;
  subTitle?: string;
  center?: boolean;
};

const Heading = (props: HeadingProps) => {
  const { title, subTitle, center } = props;
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
    </div>
  );
};

export default Heading;
