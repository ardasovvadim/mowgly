using MG.WebHost.Entities.Tournaments;

namespace MG.WebHost.Contracts.Tournaments;

public interface ITournamentService
{
    public Task<TournamentVm> GetTournamentById(Guid id);

    Task<IEnumerable<IdName>> GetStudents(TournamentStudentRequest request);
    Task<TournamentResultVm> AddTournamentResult(Guid id, TournamentResultEditModel request);
    Task DeleteTournamentResult(Guid tournamentId, Guid tournamentResultId);
    Task<TournamentEditModel> AddTournament(TournamentEditModel request);
    Task DeleteTournament(Guid tournamentId);
}