namespace MG.WebHost.Models.Users;

public class UserValidationResponseDto
{
    public bool IsSuccess { get; set; }
    public IEnumerable<string> Errors { get; set; }
}