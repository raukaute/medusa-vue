import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '../mocks/server';

// console.log('beforeAll', beforeAll);
beforeAll(() => server.listen());

// //  Close server after all tests
afterAll(() => server.close());

// // Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
