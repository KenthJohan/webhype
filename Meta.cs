using System.Text.Json;

namespace Hype;

public class Component
{
	public string? type {get;set;}
	public string? quantity {get;set;}
	public string? unit {get;set;}
	public List<string>? components {get;set;}
	public Dictionary<string,string>? jsonld {get;set;}


	public static Hype.Component? read(string filename)
	{
		string text = File.ReadAllText(filename);
		Component? c = JsonSerializer.Deserialize<Component>(text);
		return c;
	}

	public static Dictionary<string, Hype.Component> read(string[] filenames)
	{
		Dictionary<string, Hype.Component> cv = new Dictionary<string, Hype.Component>();
		foreach(string filename in filenames)
		{
			Hype.Component? c = read(Path.Combine(filename));
			if (c == null) {continue;}
			cv.Add(Path.GetFileNameWithoutExtension(filename), c);
		}
		return cv;
	}

	public static Dictionary<string, Hype.Component> read_from_directory(string root)
	{
		string[] filenames = Directory.GetFiles(root);
		return read(filenames);
	}
}


