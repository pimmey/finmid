import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { AllowedStatuses } from '~/router/loaders/dashboard';
import { getValidatedStatusParam } from '~/utils/validate-status-param';

export default function useStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParam = searchParams.get('status') as AllowedStatuses;
  const validatedStatusParam = getValidatedStatusParam(statusParam);
  const [status, setStatus] = useState<AllowedStatuses | undefined>(
    validatedStatusParam,
  );

  const handleFilterChange = useCallback(
    (status: AllowedStatuses | undefined) => {
      if (status) {
        setSearchParams({ status });
        setStatus(status);
      } else {
        setSearchParams({ status: '' });
        setStatus(undefined);
      }
    },
    [status],
  );

  return {
    handleFilterChange,
    status,
  };
}
