using System;

namespace MG.WebHost.Models
{
    public record BaseDto : IBaseDto<Guid?>
    {
        public Guid? Id { get; set; }
    }

    public interface IBaseDto<TKey>
    {
        TKey Id { get; set; }
    }
}