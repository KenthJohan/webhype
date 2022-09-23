let Global = {};

Global.nav = {};
Global.nav_get_href = (obj) =>
{
	// Deep merge from loadash, vanilla javascript does not have that:
	// Destination object
	let nav = {};
	_.merge(nav, Global.nav, obj);
	return "#" + JSURL.stringify(nav);
}


Global.update_orderby_href = () =>
{
	//console.log("update_orderby_href", Global.nav);
	const e = document.querySelectorAll("[col][order]");
	for(let i = 0; i < e.length; i++)
	{
		let col = e[i].getAttribute("col");
		let order = e[i].getAttribute("order");
		let scope = e[i].getAttribute("scope");
		if(Global.nav?.[scope]?.c?.[col]?.o == order)
		{
			e[i].classList.add("selected");
			continue;
		}
		e[i].classList.remove("selected");
		let nav = {};
		nav[scope] = {c:{}};
		nav[scope].c[col] = {o:order};
		e[i].href = Global.nav_get_href(nav);
		//console.log("update_orderby_href", scope, nav);
	}
}

Global.hashchange = () =>
{
	//console.log("Global.hashchange", Global.nav);
	let h = window.location.hash.substring(1);
	Global.nav = JSURL.parse(h);
	// Whenever navigation URL has changed we need to update all other href:
	Global.update_orderby_href();
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

Global.config_tinatable2 = 
{
	scope: "tinatable2",
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
	Global.config_tinatable2.meta = x[0];
	Tinatable.init(Global.config_tinatable1);
	Tinatable.init(Global.config_tinatable2);
});








