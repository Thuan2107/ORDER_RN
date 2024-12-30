import { Link } from 'expo-router';
import React from 'react';

import type { Post } from '@/api';
import { Image, Pressable, Text, View } from '@/components/ui';

type Props = Post;

export const OrderItem = ({ title, body, id }: Props) => {
  return (
    <Link href={`/feed/${id}`} asChild>
      <Pressable></Pressable>
    </Link>
  );
};
