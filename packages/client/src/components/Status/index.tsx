import { memo } from 'react';

import { status as TransactionStatus } from '~/data/__generated__';

import CompletedIcon from './icons/Completed';
import PendingIcon from './icons/Pending';
import RejectedIcon from './icons/Rejected';

type StatusProps = {
  status?: TransactionStatus;
};
function Status({ status }: StatusProps) {
  switch (status) {
    case 'COMPLETED':
      return <CompletedIcon />;
    case 'REJECTED':
      return <RejectedIcon />;
    case 'PENDING':
    default:
      return <PendingIcon />;
  }
}

export default memo(Status);
