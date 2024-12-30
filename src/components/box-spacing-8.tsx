import * as React from 'react';

import { View } from '@/components/ui';

type Props = {
  children: React.ReactNode;
};
const SPACING = 8;
export const BoxSpacing8 = ({ children }: Props) => {
  return <View style={{ padding: SPACING }}>{children}</View>;
};
