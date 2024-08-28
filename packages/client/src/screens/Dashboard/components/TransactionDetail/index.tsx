import { useQuery } from '@tanstack/react-query';
import { memo, useMemo } from 'react';

import Spinner from '~/components/Spinner';
import Status from '~/components/Status';
import { Transaction, UsersService } from '~/data/__generated__';
import { formatTimestamp } from '~/utils/intl-format';

type TransactionDetailProps = {
  transaction: Transaction;
};
function TransactionDetail({ transaction }: TransactionDetailProps) {
  const { data: users, isLoading: areUsersLoading } = useQuery({
    queryFn: UsersService.getUsers,
    queryKey: ['users'],
    retry: false,
  });

  const responsibleUser = useMemo(
    () => users?.find(user => transaction.userId === user.id),
    [transaction.userId, users],
  );

  return (
    <div className="sticky top-24 flex w-5/12 flex-col gap-y-4 self-start rounded-3xl border bg-white p-4 text-lg">
      <div>
        <div className="text-sm text-gray-400">Timestamp</div>
        {formatTimestamp(transaction.transactionTime)}
      </div>
      <div>
        <div className="text-sm text-gray-400">Status</div>
        <div className="flex items-center gap-x-2">
          <Status status={transaction.status} />
          {transaction?.status?.toLocaleLowerCase()}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-400">Responsible user</div>
        {areUsersLoading ? <Spinner /> : responsibleUser?.name}
      </div>
    </div>
  );
}

export default memo(TransactionDetail);
