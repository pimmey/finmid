import { useQuery } from '@tanstack/react-query';

import { getTransactionsForUserQuery } from '~/router/loaders/dashboard';
import { getUserDataFromToken } from '~/utils/token';

export default function Dashboard() {
  const { id } = getUserDataFromToken();
  const { data: transactions } = useQuery(getTransactionsForUserQuery(id));

  return (
    <div>
      {transactions?.data?.map(transaction => (
        <div key={transaction.id}>{transaction.id}</div>
      ))}
    </div>
  );
}
