("use clint");
import style from "./SearchArea.module.css";
import { BiSearch } from "react-icons/bi";
type Props = {};

const SearchArea = (props: Props) => {
  const { container, flexWrapper, locationInput, dateInput, guestsInputWrapper, guestsInputText } = style;
  return (
    <div className={container}>
      <div className={flexWrapper}>
        <div className={locationInput}>Anywhere</div>
        <div className={dateInput}>Any Week</div>
        <div className={guestsInputWrapper}>
          <div className={guestsInputText}>Add Guests</div>
          <div className={style.icon}>
            <BiSearch size={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
