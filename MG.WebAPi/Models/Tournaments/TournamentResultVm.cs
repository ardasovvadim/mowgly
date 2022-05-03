namespace MG.WebAPi.Models.Tournaments;

public record TournamentResultVm : BaseDto
{
    public IdName Student { get; set; }
    public string Place { get; set; }
    public string Score { get; set; }
    public string AdditionalInfo { get; set; }
    public string Awards { get; set; }
}