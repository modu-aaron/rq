import queryOptions from "@/service/photo/queries";
import { Photo } from "@/types/photo";
import { Hydrate, getDehydratedQueries } from "@/utils/query";

const Comments = async ({ id }: Pick<Photo, "id">) => {
  const { queryFn, queryKey } = queryOptions.comments(id);
  const queries = await getDehydratedQueries([
    {
      queryKey,
      queryFn,
    },
  ]);
  return (
    <Hydrate state={{ queries }}>
      Comments
      {JSON.stringify(queries[0].state.data)}
    </Hydrate>
  );
};

export default Comments;
