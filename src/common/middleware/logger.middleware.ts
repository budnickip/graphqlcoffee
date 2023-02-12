import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

// A field middleware can be used to:

// convert the result of a field
// validate the arguments of a field,
// or even to check field-level roles
// (for example, a middleware function that checks whether a role is required and allowed to access a target field).

// shouldn't perform any potentially time-consuming operations (such as retrieving data from a database).

//field middleware functions cannot inject dependencies nor access Nest's dependency injection container.
export const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  // console.log - before sent to the client
  console.log(value);
  return `${value} overridden by middleware`;
};
