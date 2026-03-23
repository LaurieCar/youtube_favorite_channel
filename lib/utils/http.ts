import { NextResponse } from "next/server";
import { AppError, toAppError } from "@/lib/utils/errors";

export function ok<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ data }, init);
}

export function created<T>(data: T) {
  return NextResponse.json({ data }, { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function fail(error: unknown) {
  const appError = toAppError(error);

  return NextResponse.json(
    {
      error: {
        code: appError.code,
        message: appError.message,
      },
    },
    { status: appError.status },
  );
}

export function assert(condition: unknown, error: AppError): asserts condition {
  if (!condition) {
    throw error;
  }
}
