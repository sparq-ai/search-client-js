export function getServers(appId?: string): { search: string, tracking: string } {
  let search = `https://${appId}-fast.searchtap.net/v2`;
  let tracking = `https://t.searchtap.net/v2`;
  if ((typeof window !== 'undefined') && window.location.host === "beta-web.searchtap.net") {
    search = 'http://beta-api.searchtap.net/v2/search';
    tracking = 'http://localhost:3004';
  }

  return {
    search: search,
    tracking: tracking
  }
}