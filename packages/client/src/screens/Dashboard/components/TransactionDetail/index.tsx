import { useQuery } from '@tanstack/react-query';
import { memo, useMemo } from 'react';

import Spinner from '~/components/Spinner';
import Status from '~/components/Status';
import { Transaction, UsersService } from '~/data/__generated__';
import { formatTimestamp } from '~/utils/intl-format';

type TransactionDetailProps = {
  transaction: Transaction;
  handleOnCloseClick: () => void;
};
function TransactionDetail({
  transaction,
  handleOnCloseClick,
}: TransactionDetailProps) {
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
    <div className="fixed bottom-0 left-0 flex h-3/4 w-full flex-col justify-between self-start rounded-3xl rounded-b-none border bg-white p-4 text-lg md:sticky md:top-36 md:h-auto md:w-5/12 md:rounded-b-3xl">
      <div className="flex flex-col gap-y-4">
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
      <a
        onClick={handleOnCloseClick}
        className="cursor-pointer pb-4 text-center underline md:hidden"
      >
        Close
      </a>
    </div>
  );
}

export default memo(TransactionDetail);
