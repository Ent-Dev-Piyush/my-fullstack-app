import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const HeroSection = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div>
        <Image src="/banner_img.svg" width={470} height={470} alt="Banner" />
      </div>
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 text-transparent bg-clip-text">
          Memory Quiz
        </h1>
        <p className="text-2xl md:text-3xl lg:text-3xl font-bold">
            Discover the new memory technique.
        </p>
      </div>
      <Link href="/login"><Button className="px-8 py-5 mt-4">Start Free</Button></Link>
    </div>
  );
};

export default HeroSection;
