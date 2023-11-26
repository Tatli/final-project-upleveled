import React from 'react';
import { UserIdProps } from '../../../util/types';
import DisplaySpecificUserListings from '../../components/DisplaySpecificUserListings';

export default function User({ params }: { params: UserIdProps }) {
  const userId: string = params.userId;
  const numericUserId: number = parseInt(userId);

  return (
    <div>
      <DisplaySpecificUserListings userId={numericUserId} />
    </div>
  );
}
