export function enqueue(jobName: string, payload: unknown) {
  // TODO: Connect background queue provider.
  return { jobName, payload };
}
