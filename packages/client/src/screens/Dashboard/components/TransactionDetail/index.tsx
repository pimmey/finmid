import { Transaction } from '~/data/__generated__';

type TransactionDetailProps = {
  transaction: Transaction;
};
export default function TransactionDetail({
  transaction,
}: TransactionDetailProps) {
  return (
    <div>
      {transaction.id} / {transaction.status}
      <div>
        {transaction.transactionTime &&
          new Intl.DateTimeFormat('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date(transaction.transactionTime))}
      </div>
    </div>
  );
}
