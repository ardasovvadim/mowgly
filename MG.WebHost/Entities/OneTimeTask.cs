using MG.WebHost.Entities.Interfaces;

namespace MG.WebHost.Entities;

public class OneTimeTask : BaseEntity
{
    public OneTimeTask(string task)
    {
        Task = task;
    }

    public string Task { get; protected set; }
}