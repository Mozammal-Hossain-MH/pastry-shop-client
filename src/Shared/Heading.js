const Heading = ({ subHeading, heading }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="text-[14px] font-medium text-primary">{subHeading}</p>
      <h2 className="text-4xl font-bold text-base-300">{heading}</h2>
    </div>
  );
};

export default Heading;
