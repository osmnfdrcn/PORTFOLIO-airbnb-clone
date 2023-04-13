import { BiDollar } from "react-icons/bi";

type TextInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  price?: boolean;
  value?: any;
};

const TextInput = ({
  onChange,
  placeholder,
  required,
  type,
  price,
  value,
}: TextInputProps) => {
  return (
    <div className="relative flex items-center">
      {price && (
        <BiDollar
          size={20}
          className="absolute top-3.5 left-2 text-neutral-700"
        />
      )}
      <input
        className="
          w-full p-2.5 px-9
        bg-white  font-light 
          border-2 rounded-md outline-none
        "
        type={type}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default TextInput;
