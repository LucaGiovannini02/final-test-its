import { Button } from "@/components/ui/button";
import { menu } from "@/lib/config";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="text-center">
          <div className="text-3xl font-bold my-3">Test finale</div>
          <div className="text-sm italic my-2">By Luca Giovannini</div>
        </div>
        {menu.map(item => (
          <Link key={item.id} href={item.link} className="mt-3">
            <Button className="w-full">{item.title}</Button>
          </Link>
        ))}
      </div>
    </>
  );
}
