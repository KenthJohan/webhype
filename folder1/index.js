let Global = {};

Global.config_tinatable1 = 
{
	scope: "tinatable1",
	html: 
	{
		target: document.body
	},
	backend:
	{
		get: Backend.get,
		set: Backend.set
	},
	meta: null,
};




Global.config_tinatable2 = 
{
	scope: "tinatable2",
	html: 
	{
		target: document.body
	},
	backend:
	{
		get: Backend.get,
		set: Backend.set
	},
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






/*
Promise.allSettled([
	Global.config_tinatable1.API_fetch, 
	Global.config_tinatable2.API_fetch
]).then((results) => {
	//console.log(results);
	Nav.update(Nav.state);
});
*/

