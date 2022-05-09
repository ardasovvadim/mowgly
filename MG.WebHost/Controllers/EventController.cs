using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Models;
using MG.WebHost.Models.Events;
using MG.WebHost.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebHost.Controllers;

public class EventController : BaseController
{
    private readonly IService<EventVm, Tournament> _eventService;

    public EventController(IService<EventVm, Tournament> eventService)
    {
        _eventService = eventService;
    }

    [HttpPost("list")]
    public async Task<Page<EventVm>> GetListAsync(EventListRequest request)
    {
        return await _eventService.GetListAsync(request);
    }
    
    [HttpPost]
    public async Task<EventVm> AddAsync(EventVm request)
    {
        return await _eventService.SaveAsync(request);
    }

    [HttpDelete("{id}")]
    public async Task DeleteAsync(Guid id)
    {
        await _eventService.DeleteAsync(id);
    }
}