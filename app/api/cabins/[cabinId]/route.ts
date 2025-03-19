import { getCabin, getBookedDatesByCabinId } from "@/app/_lib/data-service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ cabinId: string }> }
) {
  const cabinId = Number((await params).cabinId);

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}
