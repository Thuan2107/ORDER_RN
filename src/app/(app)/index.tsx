import React from 'react';

import { FocusAwareStatusBar, Text, View } from '@/components/ui';

export default function Feed() {
  
  return (
    <View className="flex-1 ">
      <FocusAwareStatusBar />
      <Text>Tổng quan</Text>
    </View>
  );
}
