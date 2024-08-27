import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';

import { Transaction } from '~/data/__generated__';
import {
  AllowedStatuses,
  transactionsInfiniteQuery,
} from '~/router/loaders/dashboard';

import TransactionDetail from './components/TransactionDetail';

const FILTER_STATUSES: AllowedStatuses[] = ['COMPLETED', 'PENDING', 'REJECTED'];

export default function Dashboard() {
  let [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get('status') as AllowedStatuses;
  const [status, setStatus] = useState<AllowedStatuses>(statusParam);

  const [transaction, setTransaction] = useState<Transaction>();

  const {
    data,
    refetch,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    transactionsInfiniteQuery({
      status,
    }),
  );

  function handleFilterChange(status: AllowedStatuses) {
    setSearchParams({ status });
    setStatus(status);
    refetch();
  }

  const transactions = data?.pages.flatMap(page => page.data);

  return (
    <div className="flex">
      <div>
        {isPending ? 'isPending' : 'Loaded'}
        <div className="flex gap-x-2">
          {FILTER_STATUSES.map(status => (
            <button
              key={status}
              onClick={() => handleFilterChange(status)}
              className="bg-white px-4 py-2 lowercase"
            >
              {status}
            </button>
          ))}
        </div>
        <InfiniteScroll
          dataLength={transactions?.length!}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading more transactions...</h4>}
        >
          {transactions?.map((transaction, index) =>
            transaction ? (
              <div
                key={transaction.id}
                onClick={() => setTransaction(transaction)}
                className="h-[200px] cursor-pointer bg-gray-400"
              >
                <img
                  src={transaction.merchantIconUrl}
                  alt={transaction.merchantName}
                  className="w-16 rounded-full"
                />
                {transaction.merchantName} /{' '}
                {transaction.status?.toLocaleLowerCase()} /{' '}
                {transaction.transactionTime &&
                  new Intl.DateTimeFormat('de-DE', {
                    day: 'numeric',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(transaction.transactionTime))}
                <div>
                  {transaction.amount} {transaction.currency}
                </div>
              </div>
            ) : null,
          )}
          {isFetchingNextPage && <h4>Loading...</h4>}
        </InfiniteScroll>
      </div>
      {transaction ? <TransactionDetail transaction={transaction} /> : null}
    </div>
  );
}
