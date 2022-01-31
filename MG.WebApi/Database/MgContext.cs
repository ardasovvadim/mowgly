using System;
using System.IO;
using System.Linq;
using MG.WebAPi.Settings;
using MG.WebAPi.Utils;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace MG.WebAPi.Database
{
    public sealed partial class MgContext : DbContext
    {
        private readonly AppSettings _appSettings;
        private readonly IDirectoryUtils _directoryUtils;

        public MgContext(IOptions<AppSettings> appSettings, 
            IDirectoryUtils directoryUtils)
        {
            _directoryUtils = directoryUtils;
            _appSettings = appSettings.Value;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var dataSourcePath = _directoryUtils.CombinePathFromRoot(_appSettings.DataSource);
            
            var connectionBuilder = new SqliteConnectionStringBuilder
            {
                Cache = SqliteCacheMode.Shared,
                DataSource = dataSourcePath
            };
            optionsBuilder.UseSqlite(connectionBuilder.ToString());
        }
    }
}