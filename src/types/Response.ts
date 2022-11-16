export type Response = {
  status: 'success' | 'fail' | 'error',
  message: string,
  data: unknown,
};
