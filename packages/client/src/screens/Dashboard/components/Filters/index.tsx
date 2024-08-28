import { memo } from 'react';

import Spinner from '~/components/Spinner';
import Status from '~/components/Status';
import { AllowedStatuses } from '~/router/loaders/dashboard';

export const FILTER_STATUSES: AllowedStatuses[] = [
  'COMPLETED',
  'PENDING',
  'REJECTED',
];

type FiltersProps = {
  showSpinner: boolean;
  handleFilterChange: (status: AllowedStatuses | undefined) => void;
  status: AllowedStatuses | undefined;
};
function Filters({ showSpinner, handleFilterChange, status }: FiltersProps) {
  return (
    <div className="sticky top-24 flex items-center gap-x-2">
      {FILTER_STATUSES.map(filterStatus => {
        const isSelected = filterStatus === status;
        return (
          <button
            key={filterStatus}
            onClick={() =>
              handleFilterChange(isSelected ? undefined : filterStatus)
            }
            className={`flex gap-x-2 rounded-3xl px-4 py-2 lowercase ${isSelected ? 'bg-brand text-black' : 'bg-black text-white'}`}
          >
            <Status status={filterStatus} /> {filterStatus}
          </button>
        );
      })}
      {showSpinner ? <Spinner /> : null}
    </div>
  );
}

export default memo(Filters);
