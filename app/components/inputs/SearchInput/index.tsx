type SearchInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

const SearchInput = ({ onChange, placeholder }: SearchInputProps) => {
  return (
    <input
      className="
      w-full p-2.5 
    bg-white  font-light 
      border-2 rounded-md outline-none"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default SearchInput;
