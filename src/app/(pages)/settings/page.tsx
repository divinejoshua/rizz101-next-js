import Image from "next/image";
import sliderImage from "@/app/assets/slider.png"

export default function SettingsPage() {
  return (
    <main className="mx-auto main-container mt-7 pl-4 pr-4">
      <div className="pb-4 mt-4">
        <center>
          <Image src={sliderImage} alt="Rizz101" height={250}/>
        </center>
      </div>

      <h3 className="text-lg text-default font-bold text-center mt-4">Master the Art of flirting</h3>
      <p className="text-center text-gray-500 text-sm mt-4">Unlock your charm and spark unforgettable connections with every message.</p>

      <div className="premium-card px-3 py-3 mt-10">
        <p>Premium</p>
        <p className="text-sm text-gray-500">From $5.99/Weekly</p>
      </div>
      <button
        className="bg-black w-full py-5 text-white font-bold rounded-full mt-5">
          Get started
        </button>
    </main>
  );
}