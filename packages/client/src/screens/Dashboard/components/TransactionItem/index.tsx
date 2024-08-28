import { memo } from 'react';

import Status from '~/components/Status';
import { Transaction } from '~/data/__generated__';
import { formatCurrency, formatDate } from '~/utils/intl-format';

type TransactionItemProps = {
  transaction: Transaction;
  handleClick: (transaction: Transaction) => void;
  isSelected: boolean;
};
function TransactionItem({
  transaction,
  handleClick,
  isSelected,
}: TransactionItemProps) {
  return (
    <div
      onClick={() => handleClick(transaction)}
      className={`cursor-pointer rounded-3xl border p-4 text-lg ${!isSelected ? 'border-black bg-transparent' : 'bg-white'}`}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <img
            src={transaction.merchantIconUrl}
            alt={transaction.merchantName}
            className="h-16 w-16 rounded-full"
          />
          {transaction.merchantName}
        </div>
        <div>
          <Status status={transaction.status} />
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-2xl">
          {formatCurrency({
            currency: transaction.currency,
            amount: transaction.amount,
          })}
        </div>
        <div className="text-sm text-gray-400">
          {formatDate(transaction.transactionTime)}
        </div>
      </div>
    </div>
  );
}

export default memo(TransactionItem);
