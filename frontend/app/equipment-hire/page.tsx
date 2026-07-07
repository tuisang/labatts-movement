import TopNavBar from "@/components/activity-library/TopNavBar";
import Footer from "@/components/activity-library/Footer";
import EquipmentCard from "@/components/equipment-hire/EquipmentCard";
import { prisma } from "@/lib/prisma";

export default async function EquipmentHirePage() {
  const equipment = await prisma.equipmentItem.findMany({
    orderBy: { createdAt: "asc" },
  });

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

        {equipment.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-10 video-card-shadow text-center max-w-xl">
            <p className="text-on-surface-variant">
              No equipment is listed yet. Please check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
