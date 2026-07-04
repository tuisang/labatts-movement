import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import EquipmentCard from "@/components/equipment-hire/EquipmentCard";
import { equipmentCatalog } from "@/components/equipment-hire/equipmentCatalog";

export default function EquipmentHirePage() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
      <TopNavBar />

      <main className="flex-1 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-10">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
          Equipment Hire
        </h1>
        <p className="text-on-surface-variant text-body-lg max-w-2xl mb-10">
          Rent professional training equipment by the day. Perfect for home practice
          between sessions or setting up a school PE program.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentCatalog.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
