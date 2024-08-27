import { QueryClient } from '@tanstack/react-query';

import { TransactionsService, UsersService } from '~/data/__generated__';
import { getUserDataFromToken } from '~/utils/token';

export const usersQuery = {
  queryKey: ['users'],
  queryFn: UsersService.getUsers,
};

export const getTransactionsForUserQuery = (userId?: string) => ({
  queryKey: ['transactions', userId],
  queryFn: async () => TransactionsService.getTransactions({ userId }),
  enabled: Boolean(userId),
});

export const dashboardLoader = (queryClient: QueryClient) => async () => {
  console.log('🧡 dash loader');

  const userDataFromToken = getUserDataFromToken();
  const transactionsQuery = getTransactionsForUserQuery(userDataFromToken.id);

  const transactions =
    queryClient.getQueryData(transactionsQuery.queryKey) ??
    (await queryClient.fetchQuery(transactionsQuery));

  console.log({ transactions });

  return transactions;
};
