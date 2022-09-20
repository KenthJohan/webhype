let Global = {};
Global.nav = {};
Global.nav_hrefcb = (obj) =>
{
	let nav = {...Global.nav, ... obj};
	return "#" + JSURL.stringify(nav);
}

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

	// Pass global navigation state by reference
	nav: Global.nav, 

	// Type information
	// Get this later on
	meta: null,

	nav_hrefcb: Global.nav_hrefcb,
};

Promise.all([Backend.API_meta1]).then((x) =>
{
	console.log(x[0]);
	// Value type information is used to present data in correct graphics:
	Global.config_tinatable1.meta = x[0];
	Tinatable.init(Global.config_tinatable1);
});



window.addEventListener('hashchange', () => {
	console.log(window.location.hash);
	console.log(Global.nav);
	let h = window.location.hash.substring(1);
	Global.nav = JSURL.parse(h);
	console.log(Global.nav);
  }, false);