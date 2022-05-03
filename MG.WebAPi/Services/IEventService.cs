using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MG.WebApi.Entities.Events;
using MG.WebAPi.Models;
using MG.WebAPi.Models.Events;
using MG.WebAPi.Repositories;
using MG.WebAPi.Utils;
using Microsoft.EntityFrameworkCore;

namespace MG.WebAPi.Services;

public interface IEventService
{
    Task<Page<EventVm>> GetListAsync(EventListRequest request);
    Task<EventVm> AddAsync(EventVm request);
    Task DeleteAsync(Guid id);
}

public class EventService : IEventService
{
    private readonly IRepository<Event> _eventRepository;
    private readonly IMapper _mapper;

    public EventService(IRepository<Event> eventRepository, IMapper mapper)
    {
        _eventRepository = eventRepository;
        _mapper = mapper;
    }

    public async Task<Page<EventVm>> GetListAsync(EventListRequest request)
    {
        var filterText = request.FilterText?.Trim().ToUpper();
        var query = _eventRepository
            .GetQueryable()
            .WhereIf(!filterText.IsNullOrEmpty(), e => e.NormalizedTournamentName.Contains(filterText))
            .WhereIf(request.ActionDate.HasValue, e => e.ActionDate.Date == request.ActionDate.Value.Date);

        query = request.Sort.Contains("asc") 
            ? query.OrderBy(e => e.ActionDate) 
            : query.OrderByDescending(e => e.ActionDate);

        var entities = await query.Page(request).ToListAsync();
        return new Page<EventVm>
        {
            Count = query.Count(),
            Elements = _mapper.Map<IEnumerable<EventVm>>(entities),
            PageNumber = request.PageNumber,
            PageSize = request.PageSize
        };
    }

    public async Task<EventVm> AddAsync(EventVm request)
    {
        var entity = request.Id == Guid.Empty
            ? new Event()
            : await _eventRepository.GetByIdAsync(request.Id) ?? new Event();

        _mapper.Map(request, entity);
        if (request.Id == Guid.Empty)
            await _eventRepository.InsertAsync(entity);
        else
            _eventRepository.Update(entity);

        await _eventRepository.SaveChangesAsync();
        
        return _mapper.Map<EventVm>(entity);
    }

    public async Task DeleteAsync(Guid id)
    {
        await _eventRepository.DeleteAsync(id);
        await _eventRepository.SaveChangesAsync();
    }
}
