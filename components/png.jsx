import png5 from "../src/assets/png/png8.png";
import "../components/pngtxt.scss";



function BGIMG() {
  return (
    <>
      <div className="mt-24 mx-auto flex flex-col items-center w-[374px] bg-[#0F0F1E] rounded-3xl shadow-2xl pb-8 relative">
        <img src={png5} alt="Background" className="img-top-right" />

      </div>
    </>
  );
}

export default BGIMG;
