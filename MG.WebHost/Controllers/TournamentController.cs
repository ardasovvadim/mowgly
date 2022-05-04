using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MG.WebHost.Controllers;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Tournaments;
using MG.WebHost.Repositories;
using MG.WebHost.Services;
using MG.WebHost.Utils;
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
    
    // admin
    [HttpPost]
    public async Task<TournamentEditModel> AddTournament(TournamentEditModel request)
    {
        return await _tournamentService.AddTournament(request);
    }
    
    // admin
    [HttpDelete("{id}")]
    public async Task DeleteTournament(Guid tournamentId)
    {
        await _tournamentService.DeleteTournament(tournamentId);
    }
    
    // admin
    [HttpPost("{id}/result")]
    public async Task<TournamentResultVm> AddTournamentResult([FromRoute] Guid id, [FromBody] TournamentResultEditModel request)
    {
        return await _tournamentService.AddTournamentResult(id, request);
    }

    [HttpDelete("{tournamentId}/result/{tournamentResultId}")]
    public async Task DeleteTournamentResult(Guid tournamentId, Guid tournamentResultId)
    {
        await _tournamentService.DeleteTournamentResult(tournamentId, tournamentResultId);
    }
}