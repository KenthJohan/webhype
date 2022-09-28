let Backend = {};
Backend.API_meta1 = fetch('meta1.json').then(r => r.json());
Backend.get = async (count, cursor) =>
{
	return fetch('/api1/baja').then(r => r.json());
}
Backend.set = async (ids, count, cursor) =>
{

}
