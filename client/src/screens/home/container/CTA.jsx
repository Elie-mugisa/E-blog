
const CTA = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
        className="h-auto max-h-20 w-full translate-y-[1px]   "
      >
        <path
          fill="#0D2436"
          fillOpacity="1"
          d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,154.7C672,128,768,96,864,80C960,64,1056,64,1152,64C1248,64,1344,64,1392,64L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>

      <section className="relative bg bg-dark-hard px-5">
        <div className="container  flex justify-center items-center flex-col mx-auto gap-8 lg:flex-row-reverse ">
          <div className=" bg-dark-hard w-full lg:w-1/2 ">
            <h2 className="text-white font-roboto font-bold text-2xl text-center ">
              Get our stories delivered from us to your inbox weekly
            </h2>

            {/* Input */}
            <div className="w-full max-w-[497px] mt-12 space-y-3 mx-auto ">
              <input
                type="text"
                className="px-4 py-2 rounded-lg border-none w-full outline-none "
                placeholder="Your email.."
              />
              <button className="px-6 mx-auto py-2 rounded-lg bg-prim text-white w-full  ">
                Get Started
              </button>
            </div>
          </div>
          {/*  */}
          <div className="w-full lg:w-1/2">
            <p className="text-dark-light text-sm leading-7 mt-6 ">
              <span className="font-bold italic text-[#B3BAC5 ] ">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </span>{" "}
              Deserunt sapiente saepe magnam dignissimos esse natus nostrum qui
              inventore asperiores, repellat incidunt! Ipsa autem dolorem ea
              recusandae veritatis, minima vel distinctio!
            </p>
            
          </div>
        </div>
      </section>
    </>
  );
};

export default CTA;
