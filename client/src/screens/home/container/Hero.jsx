import image from "../../../assets/10.png";
import { CiSearch } from "react-icons/ci";

const Hero = () => {
  return (
    <section className=" flex flex-col lg:flex-row">
      {/* text */}
      <div className="w-full py-10 font-nunito px-7 flex flex-col justify-center items-center gap-4 lg:pl-20 lg:w-1/2 lg:py-0 ">
        {/* titre & para */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-center text-dark-hard lg:text-start ">
            Read the most intersting articles
          </h1>
          <p className="text-dark-light text-sm text-center lg:text-start  ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            qui ut doloribus eum ea voluptatibus provident quis eaque nihil.
            Totam facere sint at maiores perferendis consequuntur non veniam
            fuga voluptatem.
          </p>
        </div>
        {/* search bar */}
        <div className=" flex justify-center items-center flex-col gap-2 w-full p-1 lg:flex-row ">
          <div className="relative flex justify-center items-center w-full lg:w-[80%] ">
            <input
              className="w-full shadow-md border rounded-lg outline-prim p-2 pl-7 placeholder:text-sm "
              type="text"
              placeholder="Category, Populaire, Techologie"
            />
            <CiSearch className="absolute left-2 text-dark-light cursor-pointer " />
          </div>
          <div className="flex justify-center w-full  lg:justify-start lg:w-[20%] ">
            <div className="bg-gradient-to-r from-prim to-purple-500 w-full text-center text-white rounded-md px-5  py-2">
              search
            </div>
          </div>
        </div>
        {/* populat tags */}
        <div className="flex flex-col gap-4 w-full mt-5 ">
          <h1 className="text-dark-hard  ">Popular Tags:</h1>
          <div className="flex gap-4 flex-wrap ">
            <div className="bg-dark-soft bg-opacity-10 cursor-pointer font-semibold text-prim px-4 py-1 rounded-md ">
              Back-End
            </div>
            <div className="bg-dark-soft bg-opacity-10 cursor-pointer font-semibold text-prim px-4 py-1 rounded-md ">
              User Interfaces
            </div>
            <div className="bg-dark-soft bg-opacity-10 cursor-pointer font-semibold text-prim px-4 py-1 rounded-md ">
              User Experience
            </div>
          </div>
        </div>
      </div>

      {/* photo */}
      <div
        className="hidden w-full  justify-center items-center
       lg:w-1/2  lg:flex "
      >
        <img src={image} alt="illustration pic" />
      </div>
    </section>
  );
};

export default Hero;
