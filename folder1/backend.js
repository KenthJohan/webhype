let Backend = {};
Backend.fetch_meta = fetch('meta1.json').then(r => r.json());
Backend.fetcher_get = async (count, cursor) =>
{
	return fetch('/api1/baja').then(r => r.json());
}
Backend.fetcher_set = async (ids, count, cursor) =>
{

}
