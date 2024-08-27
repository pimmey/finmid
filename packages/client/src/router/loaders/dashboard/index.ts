import { QueryClient } from '@tanstack/react-query';

import {
  GetTransactionsResponse,
  status as TransactionStatus,
  TransactionsService,
} from '~/data/__generated__';

export type AllowedStatuses = Exclude<TransactionStatus, 'REVERSED'>;

type TransactionsQueryProps = {
  status?: AllowedStatuses;
};
export const transactionsInfiniteQuery = ({
  status,
}: TransactionsQueryProps) => ({
  queryKey: ['transactions', status],
  queryFn: async ({ pageParam = 0 }) =>
    TransactionsService.getTransactions({
      status: status || undefined,
      offset: pageParam,
    }),
  initialPageParam: 0,
  getNextPageParam: (lastPage: GetTransactionsResponse) => {
    const offset = lastPage?.meta?.offset || 0;
    const limit = lastPage?.meta?.limit || 0;
    const total = lastPage?.meta?.total || 0;
    return offset + limit < total ? offset + limit : undefined;
  },
});

export const dashboardLoader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') as AllowedStatuses;
    const query = transactionsInfiniteQuery({ status });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchInfiniteQuery(query))
    );
  };
