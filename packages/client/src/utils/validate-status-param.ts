import { AllowedStatuses } from '~/router/loaders/dashboard';
import { FILTER_STATUSES } from '~/screens/Dashboard/components/Filters';

export function getValidatedStatusParam(
  statusSearchParam: AllowedStatuses | null | undefined,
) {
  if (typeof statusSearchParam !== 'string') {
    return undefined;
  }

  return FILTER_STATUSES.includes(statusSearchParam as AllowedStatuses)
    ? statusSearchParam
    : undefined;
}
