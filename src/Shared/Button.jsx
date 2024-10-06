import { IoIosArrowRoundForward } from "react-icons/io";
const Button = ({
  text,
  icon = true,
  paddings = "px-5 py-3",
  handler,
  isLoading,
}) => {
  return (
    <div className="inline-block group">
      <button
        onClick={handler}
        className={`text-primary border border-primary ${paddings} rounded-full flex items-center gap-2 group-hover:border-base-300 transition-[border]`}
      >
        <p className="group-hover:text-base-300 transition-[color] duration-700">
          {text}
        </p>
        {icon && (
          <IoIosArrowRoundForward className="group-hover:text-base-300 group-hover:translate-x-2  transition-transform duration-300" />
        )}
      </button>
    </div>
  );
};

export default Button;
