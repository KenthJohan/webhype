let Backend = {};
Backend.API_meta1 = fetch('meta1.json').then(r => r.json());
Backend.API_requestor_fetch = async (count, cursor) =>
{
	return fetch('/api1/baja').then(r => r.json());
}
Backend.API_requestor_update = (ids, count, cursor) =>
{

}
