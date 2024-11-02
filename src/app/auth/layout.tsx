import { Card } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center">
      <Card className="min-w-[400px]">{children}</Card>
    </div>
  );
}
