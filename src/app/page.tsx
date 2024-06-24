import Comments from "@/components/Comments";
import queryOptions from "@/service/photo/queries";
import { usePhotos } from "@/service/photo/usePhotoService";
import { Hydrate, getDehydratedQuery } from "@/utils/query";

export default async function Home() {
  const { queryKey, queryFn } = queryOptions.all();
  const dehydratedQuery = await getDehydratedQuery({
    queryKey,
    queryFn,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hydrate state={{ queries: [dehydratedQuery] }} />
      <h1 className="text-4xl font-bold">Photos</h1>
      <div className="grid grid-cols-4 gap-4"></div>
      <Comments id={1} />
    </main>
  );
}
