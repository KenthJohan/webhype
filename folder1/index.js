let Global = {};

Global.t1 = 
{
	scope: "tinatable1",
	html: 
	{
		target: document.body
	},
	backend:
	{
		fetcher_get: Backend.fetcher_get,
		fetcher_set: Backend.fetcher_set
	},
	meta: null,
};




Global.t2 = 
{
	scope: "tinatable2",
	html: 
	{
		target: document.body
	},
	backend:
	{
		fetcher_get: Backend.fetcher_get,
		fetcher_set: Backend.fetcher_set
	},
	meta: null,
};





Promise.all([Backend.fetch_meta]).then((x) =>
{
	// console.log(x[0]);
	// Value type information is used to present data in correct graphics:
	Global.t1.meta = x[0];
	Global.t2.meta = x[0];
	Tinatable.init(Global.t1);
	Tinatable.init(Global.t2);
});






/*
Promise.allSettled([
	Global.config_tinatable1.API_fetch, 
	Global.config_tinatable2.API_fetch
]).then((results) => {
	//console.log(results);
	Nav.update(Nav.state);
});
*/

