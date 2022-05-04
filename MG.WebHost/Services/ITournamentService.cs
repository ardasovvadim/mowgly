using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Tournaments;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Services;

public interface ITournamentService
{
    public Task<TournamentVm> GetTournamentById(Guid id);

    Task<IEnumerable<IdName>> GetStudents(TournamentStudentRequest request);
    Task<TournamentResultVm> AddTournamentResult(Guid id, TournamentResultEditModel request);
    Task DeleteTournamentResult(Guid tournamentId, Guid tournamentResultId);
    Task<TournamentEditModel> AddTournament(TournamentEditModel request);
    Task DeleteTournament(Guid tournamentId);
}

public class TournamentService : ITournamentService
{
    private readonly IRepository<User> _userRepository;
    private readonly IRepository<Tournament> _tournamentRepository;
    private readonly IRepository<TournamentResult> _tournamentResultRepository;
    private readonly IMapper _mapper;

    public TournamentService(
        IRepository<User> userRepository, 
        IRepository<Tournament> tournamentRepository, 
        IRepository<TournamentResult> tournamentResultRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _tournamentRepository = tournamentRepository;
        _tournamentResultRepository = tournamentResultRepository;
        _mapper = mapper;
    }

    public async Task<TournamentVm> GetTournamentById(Guid id)
    {
        var entity = (await _tournamentRepository.GetAsync(t => t.Id == id, "Results.User")).FirstOrDefault();
        return _mapper.Map<TournamentVm>(entity);
    }

    public async Task<IEnumerable<IdName>> GetStudents(TournamentStudentRequest request)
    {
        var filterText = request?.FilterText?.Trim().ToUpper();
        return await _userRepository.GetQueryable()
            .WhereIf(request.Except != null && request.Except.Any(), u => !request.Except.Contains(u.Id))
            .WhereIf(!filterText.IsNullOrEmpty(), u => u.NormalizedName.ToLower().Contains(filterText))
            .Where(s => s.UserTypes.HasFlag(UserType.Student))
            .Take(5)
            .Select(u => new IdName { Id = u.Id, Name = u.ConcatName() })
            .ToListAsync();
    }

    public async Task<TournamentResultVm> AddTournamentResult(Guid id, TournamentResultEditModel request)
    {
        if (! await _tournamentRepository.IsExistsAsync(id))
            // todo: throw exception and handling
            return null;

        var student = await CheckStudentOrAddAsync(request.Student);
        var result = request.Id.HasValue
            ? (await _tournamentResultRepository.GetAsync(t => t.Id == request.Id.Value
                                                               && t.TournamentId == id)).FirstOrDefault() ?? new TournamentResult()
            : new TournamentResult();

        _mapper.Map(request, result);
        result.TournamentId = id;
        result.UserId = student.Id.Value;
        
        if (result.Id != Guid.Empty)
            _tournamentResultRepository.Update(result);
        else
            await _tournamentResultRepository.InsertAsync(result);

        await _tournamentResultRepository.SaveChangesAsync();

        return _mapper.Map<TournamentResultVm>(result);
    }

    public async Task DeleteTournamentResult(Guid tournamentId, Guid tournamentResultId)
    {
        var tournament = (await _tournamentResultRepository.GetAsync(t => t.Id == tournamentResultId && t.TournamentId == tournamentId)).FirstOrDefault();
        if (tournament is null)
            return;

        await _tournamentResultRepository.DeleteAsync(tournamentResultId);
        await _tournamentRepository.SaveChangesAsync();
    }

    public async Task<TournamentEditModel> AddTournament(TournamentEditModel request)
    {
        var result = request.Id.HasValue
            ? await _tournamentRepository.GetByIdAsync(request.Id.Value) ?? new Tournament()
            : new Tournament();
        _mapper.Map(request, result);
        
        if (request.Id.HasValue)
            _tournamentRepository.Update(result);
        else 
            await _tournamentRepository.InsertAsync(result);
        await _tournamentRepository.SaveChangesAsync();
        
        return _mapper.Map<TournamentEditModel>(result);
    }

    public async Task DeleteTournament(Guid tournamentId)
    {
        await _tournamentRepository.DeleteAsync(tournamentId);
        await _tournamentRepository.SaveChangesAsync();
    }

    private async Task<IdName> CheckStudentOrAddAsync(IdName student)
    {
        if (student.Id.HasValue)
        {
            var result = (await _userRepository.GetAsync(u => u.Id == student.Id && u.UserTypes.HasFlag(UserType.Student))).FirstOrDefault();
            if (result is not null)
                return student;
        }

        var nameParts = student.Name.Trim().Split(" ");
        var newStudent = new User
        {
            UserTypes = UserType.Student,
            FirstName = nameParts.Length >= 2 ? nameParts[1] : null,
            LastName = nameParts.Length >= 1 ? nameParts.First() : null,
            MiddleName = nameParts.Length >= 3 ? nameParts.Last() : null
        };
        await _userRepository.InsertAsync(newStudent);
        await _userRepository.SaveChangesAsync();

        return new IdName
        {
            Id = newStudent.Id,
            Name = newStudent.ConcatName()
        };
    }
}