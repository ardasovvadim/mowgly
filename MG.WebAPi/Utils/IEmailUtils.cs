using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace MG.WebAPi.Utils
{
    public interface IEmailUtils
    {
        string GenerateEmailBody(string template, IDictionary<string, object> objects);
    }

    public class EmailUtils : IEmailUtils
    {
        private const string EmailInterpolationPattern = @"{{[\w.]*}}";

        public string GenerateEmailBody(string template, IDictionary<string, object> objects)
        {
            if (string.IsNullOrEmpty(template) || !(objects?.Any() ?? false))
                return template;
            
            var regex = new Regex(EmailInterpolationPattern, RegexOptions.Compiled);
            var match = regex.Match(template);
            var result = new StringBuilder(template);
            
            while (match.Success)
            {
                var interpolationPath = match.Value
                    .Replace("{", string.Empty)
                    .Replace("}", string.Empty)
                    .Trim();
                var value = interpolationPath.Length != 0 
                    ? ResolveInterpolatedValue(interpolationPath, objects)
                    : string.Empty;
                
                result = result.Replace(match.Value, value);
                match = match.NextMatch();
            }

            return result.ToString();
        }

        private string ResolveInterpolatedValue(string interpolationPath, IDictionary<string, object> objects)
        {
            var keys = interpolationPath.Split(".");

            if (keys.Length == 1)
                return objects.ContainsKey(interpolationPath) 
                    ? objects[interpolationPath].ToString() 
                    : string.Empty;

            var key = keys.First();
            var obj = objects.ContainsKey(key) ? objects[key] : null;
            
            if (obj == null)
                return string.Empty;

            var json = JsonDocument.Parse(JsonSerializer.Serialize(obj)).RootElement;
            for (var i = 1; i < keys.Length; i++)
            {
                key = keys[i];
                var lastKey = i+1 == keys.Length;

                var jsonProperties = json.EnumerateObject();
                var nextPropertyExists = jsonProperties.Any(e => e.Name.Equals(key, StringComparison.CurrentCultureIgnoreCase));
                if (!nextPropertyExists)
                    break;

                json = jsonProperties.Single(e => e.Name.Equals(key, StringComparison.CurrentCultureIgnoreCase)).Value;

                if (lastKey)
                    switch (json.ValueKind)
                    {
                        case JsonValueKind.Number:
                            return json.GetInt32().ToString();
                        case JsonValueKind.String:
                            return json.GetString();
                        default:
                            return string.Empty;
                    }
            }

            return string.Empty;
        }
    }
}