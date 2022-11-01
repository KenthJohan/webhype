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
	// Value type information is used to represent data in correct graphics:
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




// The navstate is stored in the URL-hash.
// Update the GUI accordingly when URL-hash has been changed:
Global.hashchange = () =>
{
	if(Global.hashchange_ignore)
	{
		Global.hashchange_ignore = false;
		return;
	}
	console.log("Global.hashchange");
	// Everytime the URL-hash has changed we need to parse the URL-hash and update the Global navstate:
	let h = window.location.hash.substring(1);
	Global.navstate = JSURL.parse(h);

	// Whenever navstate has changed we need to update all other href:
	Tinatable.update(Global.t1, Global.navstate["t1"]);
	Tinatable.update(Global.t2, Global.navstate["t2"]);
	Promise.all([Global.t1.prom, Global.t2.prom]).then(x => {
		Nav.update(Global.navstate);
	});
}

window.addEventListener('hashchange', Global.hashchange, false);

Global.setnav = (state) =>
{
	Global.hashchange_ignore = true;
	window.location.hash = Nav.href(state, null);
}

