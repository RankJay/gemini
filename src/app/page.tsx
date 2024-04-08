import AsideNavigationBar from "@/components/aside/aside";
import Header from "@/components/header/header";
import Interface from "@/components/interface/interface";

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full">{/* TBA: pl-[53px] */}
      {/* <AsideNavigationBar /> */}
      <div className="flex flex-col">
        <Header />
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <Interface />
        </main>
      </div>
    </div>
  );
}
