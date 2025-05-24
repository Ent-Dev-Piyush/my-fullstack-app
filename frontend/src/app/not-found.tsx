import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <Image src="/404.svg" width={550} height={550} alt="404" />
      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
