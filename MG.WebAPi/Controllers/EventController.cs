using System;
using System.Threading.Tasks;
using MG.WebAPi.Controllers;
using MG.WebAPi.Models;
using MG.WebAPi.Models.Events;
using MG.WebAPi.Services;
using Microsoft.AspNetCore.Mvc;

namespace MG.WebApi.Controllers;

public class EventController : BaseController
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
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
        return await _eventService.AddAsync(request);
    }

    [HttpDelete("{id}")]
    public async Task DeleteAsync(Guid id)
    {
        await _eventService.DeleteAsync(id);
    }
}