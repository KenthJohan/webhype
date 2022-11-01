// The backend adapter should not make duplicate request.
let Backend = {};
Backend.qfetch = async (q) =>
{
	console.assert(typeof(q) === 'string');
	let body = {query:q};
	return fetch('/graphql', {
		method:"post", 
		headers: {'Accept': 'application/json','Content-Type': 'application/json'}, 
		body:JSON.stringify(body)
	}).then(r => r.json());
}



Backend.fetch_meta = fetch('meta').then(r => r.json());
Backend.fetcher_get = async (param) =>
{
	//console.log("fetcher_get", param);
	return fetch('/api1/baja').then(r => r.json()).then(r => {
		let v = {
			rows: r,
			cursor: ["XXX", "YYY"],
		}
		return v;
	});
}
Backend.fetcher_set = async (ids, count, cursor) =>
{

}
