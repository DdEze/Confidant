export function getLocalDateISO(): string {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  return now.toISOString().split('T')[0]; 
}