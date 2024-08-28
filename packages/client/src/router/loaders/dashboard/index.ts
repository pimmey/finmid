import { QueryClient } from '@tanstack/react-query';

import {
  GetTransactionsResponse,
  status as TransactionStatus,
  TransactionsService,
} from '~/data/__generated__';
import { FILTER_STATUSES } from '~/screens/Dashboard/components/Filters';
import { getValidatedStatusParam } from '~/utils/validate-status-param';

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
  getNextPageParam: ({ meta }: GetTransactionsResponse) => {
    const offset = meta?.offset || 0;
    const limit = meta?.limit || 0;
    const total = meta?.total || 0;
    return offset + limit < total ? offset + limit : undefined;
  },
});

export const dashboardLoader =
  (queryClient: QueryClient) =>
  async ({ request }: { request: Request }) => {
    const url = new URL(request.url);

    const statusSearchParam = url.searchParams.get('status') as AllowedStatuses;
    const status = getValidatedStatusParam(statusSearchParam);
    const query = transactionsInfiniteQuery({ status });

    try {
      return (
        queryClient.getQueryData(query.queryKey) ??
        (await queryClient.fetchInfiniteQuery(query))
      );
    } catch (error) {
      return null;
    }
  };
