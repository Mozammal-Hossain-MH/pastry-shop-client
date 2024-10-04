const Heading = ({ subHeading, heading }) => {
  return (
    <div className="flex flex-col justify-center items-center ">
      <p className="text-[14px] font-medium text-primary">{subHeading}</p>
      <h2 className="text-2xl md:text-4xl font-bold text-base-300">
        {heading}
      </h2>
      <div className={`w-[100px] `}>
        <div className={`wavy-line-heading`}></div>
      </div>
    </div>
  );
};

export default Heading;
