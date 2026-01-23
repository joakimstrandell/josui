'use client';

import { isTouchDevice } from '@josui/core-web';
import { useEffect, useState } from 'react';

export function useIsTouchDevice() {
  const [isTouchDeviceState, setIsTouchDeviceState] = useState(false);

  useEffect(() => {
    setIsTouchDeviceState(isTouchDevice());
  }, []);

  return isTouchDeviceState;
}
