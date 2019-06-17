export function getServers(appId?: string): { search: string, tracking: string } {
  let search = `https://${appId}-fast.searchtap.net/v2`;
  let tracking = `https://t.searchtap.net/v2`;
  if ((typeof window !== 'undefined') && window.location.hostname === "139.59.48.135") {
    search = 'http://139.59.93.13:9000/v2/search';
    tracking = 'http://139.59.52.249/v2';
  }

  return {
    search: search,
    tracking: tracking
  }
}