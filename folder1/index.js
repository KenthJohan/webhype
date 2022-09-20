let Global = {};

Global.nav = {};
Global.nav_get_href = (obj) =>
{
	//console.log("nav:", Global.nav, obj);
	let nav = {...Global.nav, ... obj};
	return "#" + JSURL.stringify(nav);
}


Global.update_orderby_href = () =>
{
	const e = document.querySelectorAll("[col][order]");
	for(let i = 0; i < e.length; i++)
	{
		console.log(e[i]);
		let col = e[i].getAttribute("col");
		let order = e[i].getAttribute("order");
		let scope = e[i].getAttribute("scope");
		let nav = {};
		nav[scope] = {c:{}};
		nav[scope].c[col] = {o:order};
		e[i].href = Global.nav_get_href(nav);
	}
}

Global.hashchange = () =>
{
	console.log(window.location.hash);
	console.log(Global.nav);
	let h = window.location.hash.substring(1);
	Global.nav = JSURL.parse(h);
	console.log(Global.nav);
}

window.addEventListener('hashchange', Global.hashchange, false);


Global.config_tinatable1 = 
{
	scope: "tinatable1",
	html: 
	{
		// Append target of generated html:
		target: document.body
	},
	// Callback for fetching new data from backend
	API_requestor_fetch: Backend.API_requestor_fetch,
	// Callback for updating data in backend
	API_requestor_update: Backend.API_requestor_update,
	API_requestor_update_cb: () => {Global.update_orderby_href();},
	// Type information
	// Get this later on
	meta: null,


};

Promise.all([Backend.API_meta1]).then((x) =>
{
	// console.log(x[0]);
	// Value type information is used to present data in correct graphics:
	Global.config_tinatable1.meta = x[0];
	Tinatable.init(Global.config_tinatable1);
});








