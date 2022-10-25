let Global = {};
Global.navstate = {};
Global.navstate["t1"] = 
{
	o: ["$s", "id", "name"],
};
Global.navstate["t2"] = 
{
	o: ["id"]
};


Global.t1 = 
{
	scope: "t1",
	html: 
	{
		target: document.getElementById("t1")
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
	scope: "t2",
	html: 
	{
		target: document.getElementById("t2")
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
	let h = Nav.href(Global.navstate, null);
	if (h != window.location.hash)
	{
		window.location.hash = h;
	}
	else
	{
		Global.hashchange();
	}
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




Global.hashchange = () =>
{
	console.log("Global.hashchange1", Global.navstate);
	let h = window.location.hash.substring(1);
	Global.navstate = JSURL.parse(h);
	console.log("Global.hashchange2", Global.navstate);
	//console.log(Nav.state);
	// Whenever navigation URL has changed we need to update all other href:
	Tinatable.update(Global.t1, Global.navstate["t1"]);
	Tinatable.update(Global.t2, Global.navstate["t2"]);
	Nav.update(Global.navstate);
}

window.addEventListener('hashchange', Global.hashchange, false);