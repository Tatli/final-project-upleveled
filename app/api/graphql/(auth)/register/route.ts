import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { User } from '../../../../../migrations/00003-createTableUsers';

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): NextResponse<RegisterResponseBodyPost> {
  const body = await request.json();

  // 1. Get the user data from request
  // 2. Validate the user data
  // 3. Check if user already exists in database
  // 4. Hash the plain password from the user
  // 5. Save the user information with the hashed password in the database
  // 6. Return the new user information without the password hash

  return NextResponse.json({
    user: {
      username: 'Hello',
    },
  });
}
