import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <>
            <div>
                <Link href="/"><Button className="my-3"><Home className="mr-2" />Home</Button></Link>
                {children}
            </div>
        </>
    )
}

export default Layout