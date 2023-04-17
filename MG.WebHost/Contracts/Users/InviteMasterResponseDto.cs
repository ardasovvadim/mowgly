using System.Text.Json.Serialization;

namespace MG.WebHost.Contracts.Users;

public class InviteMasterResponseDto
{
    public string InviteLink { get; set; }
    
    [JsonIgnore]
    public Guid InviteId { get; set; }
    
    public IEnumerable<string> Errors { get; set; }
    public bool IsSuccess { get; set; }
}