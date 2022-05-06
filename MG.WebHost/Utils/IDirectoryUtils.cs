using System;
using System.IO;

namespace MG.WebHost.Utils
{
    public interface IDirectoryUtils
    {
        string CombinePathFromRoot(string path);
        string EnsureFolderCreated(string subPath);
    }

    public class DirectoryUtils : IDirectoryUtils
    {
        private readonly string _rootProjectPath;

        public DirectoryUtils()
        {
            _rootProjectPath = Environment.CurrentDirectory;
        }

        public string CombinePathFromRoot(string path) => Path.Combine(_rootProjectPath, path);
        public string EnsureFolderCreated(string subPath) => Directory.CreateDirectory(subPath).FullName;
    }
}