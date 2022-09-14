using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/r1", () => "Hello World 1");
app.MapGet("/r2/{name:alpha}", async context => {
	var name = context.Request.RouteValues["name"];
	await context.Response.WriteAsJsonAsync(new {message = $"Hello {name}"});
});

app.MapGet("/api1/{name:alpha}", async context => {
	var name = context.Request.RouteValues["name"];
	var data = new[] 
	{
		new {id = 1, name = "hej", bonker = "Lajban"},
		new {id = 2, name = "hej", bonker = "Lajban"},
		new {id = 3, name = "hej", bonker = "Lajban"},
		new {id = 4, name = "hej", bonker = "Lajban"},
		new {id = 5, name = "hej", bonker = "Lajban"},
	};
	await context.Response.WriteAsJsonAsync(data);
});



{
	FileServerOptions a = new FileServerOptions  
	{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "folder2")),  
	RequestPath = "/a2",  
	EnableDefaultFiles = true,
	};
	a.StaticFileOptions.OnPrepareResponse = (context) =>
	{
	    // Disable caching of all static files.
	    context.Context.Response.Headers["Cache-Control"] = "no-cache, no-store";
	    context.Context.Response.Headers["Pragma"] = "no-cache";
	    context.Context.Response.Headers["Expires"] = "-1";
	};
	app.UseFileServer(a);
}


{
	FileServerOptions a = new FileServerOptions  
	{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "folder1")),  
	RequestPath = "",  
	EnableDefaultFiles = true,
	};
	a.StaticFileOptions.OnPrepareResponse = (context) =>
	{
	    // Disable caching of all static files.
	    context.Context.Response.Headers["Cache-Control"] = "no-cache, no-store";
	    context.Context.Response.Headers["Pragma"] = "no-cache";
	    context.Context.Response.Headers["Expires"] = "-1";
	};
	app.UseFileServer(a);
}



app.Run();
