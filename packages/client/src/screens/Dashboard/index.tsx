import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from '~/components/Spinner';
import { Transaction } from '~/data/__generated__';
import { transactionsInfiniteQuery } from '~/router/loaders/dashboard';
import Filters from '~/screens/Dashboard/components/Filters';

import TransactionDetail from './components/TransactionDetail';
import TransactionItem from './components/TransactionItem';
import useStatus from './hooks/use-status';

export default function Dashboard() {
  const { handleFilterChange, status } = useStatus();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>();

  const { data, isLoading, isPending, fetchNextPage, hasNextPage, isError } =
    useInfiniteQuery(
      transactionsInfiniteQuery({
        status,
      }),
    );

  const transactions = data?.pages.flatMap(page => page.data);

  const handleOnTransactionClick = useCallback((transaction: Transaction) => {
    setSelectedTransaction(transaction);
  }, []);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-2xl md:text-4xl">Transactions</div>
      <Filters
        showSpinner={isLoading || isPending}
        handleFilterChange={handleFilterChange}
        status={status}
      />
      <div className="flex justify-between">
        <div className="w-full md:w-1/2">
          {isError ? (
            <div>
              Couldn't load transactions. Try refreshing the page or contact us
              for support.
            </div>
          ) : null}
          <InfiniteScroll
            dataLength={transactions?.length || 0}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={
              <div className="flex h-10 items-center justify-center gap-x-2">
                <Spinner />
              </div>
            }
            className="flex flex-col gap-y-2"
          >
            {transactions?.map(transaction =>
              transaction ? (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  handleClick={handleOnTransactionClick}
                  isSelected={selectedTransaction?.id === transaction.id}
                />
              ) : null,
            )}
          </InfiniteScroll>
        </div>
        {selectedTransaction ? (
          <TransactionDetail
            transaction={selectedTransaction}
            handleOnCloseClick={() => setSelectedTransaction(undefined)}
          />
        ) : null}
      </div>
    </div>
  );
}
