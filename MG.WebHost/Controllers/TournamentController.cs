using MG.WebHost.Config;
using MG.WebHost.Contracts;
using MG.WebHost.Contracts.Tournaments;
using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers;

public class TournamentController : BaseController
{
    private readonly ITournamentService _tournamentService;

    public TournamentController(ITournamentService tournamentService)
    {
        _tournamentService = tournamentService;
    }

    [HttpGet("{id}")]
    public async Task<TournamentVm> GetTournamentById(Guid id)
    {
        return await _tournamentService.GetTournamentById(id);
    }

    [HttpPost("students")]
    public async Task<IEnumerable<IdName>> GetStudents(TournamentStudentRequest request)
    {
        return await _tournamentService.GetStudents(request);
    }
    
    [HttpPost, Authorize(MgPermissions.Tournament.Create)]
    public async Task<TournamentEditModel> AddTournament(TournamentEditModel request)
    {
        return await _tournamentService.AddTournament(request);
    }
    
    [HttpDelete("{id}"), Authorize(MgPermissions.Tournament.Delete)]
    public async Task DeleteTournament(Guid tournamentId)
    {
        await _tournamentService.DeleteTournament(tournamentId);
    }
    
    [HttpPost("{id}/result"), Authorize(MgPermissions.Tournament.Create)]
    public async Task<TournamentResultVm> AddTournamentResult([FromRoute] Guid id, [FromBody] TournamentResultEditModel request)
    {
        return await _tournamentService.AddTournamentResult(id, request);
    }

    [HttpDelete("{tournamentId}/result/{tournamentResultId}"), Authorize(MgPermissions.Tournament.Delete)]
    public async Task DeleteTournamentResult(Guid tournamentId, Guid tournamentResultId)
    {
        await _tournamentService.DeleteTournamentResult(tournamentId, tournamentResultId);
    }
}