using MG.WebHost.Config;
using MG.WebHost.Entities;
using MG.WebHost.Models;
using MG.WebHost.Models.Orders;
using MG.WebHost.Models.Registrations;
using MG.WebHost.Services;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MG.WebHost.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IRegistrationService _registrationService;

        public OrderController(IRegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

        [HttpPost]
        public async Task Registration(OrderDto dto)
        {
            await _registrationService.RegistrationAsync(dto);
        }
        
        [HttpPost("list"), Authorize(MgPermissions.Order.Get)]
        public async Task<Page<OrderVm>> GetListAsync(GetOrderListRequest request)
        {
            return await BaseService.GetListAsync<OrderVm, Order>(request, query =>
            {
                return query
                    .WhereIf(request.FilterText.IsNotNullOrEmpty(), e => e.NormalizedName.Contains(request.FilterText))
                    .WhereIf(request.CreatedTime != null, e => e.CreatedDate.Date == request.CreatedTime.Value.Date)
                    .WhereIf(request.Processed != null, e => e.Processed == request.Processed)
                    .Include(e => e.Master)
                    .Include(e => e.Location)
                    .Include(e => e.Section)
                    ;
            });
        }

        [HttpPost("{id}/process"), Authorize(MgPermissions.Order.Edit)]
        public async Task MarkAsProcessedAsync(Guid id)
        {
            await _registrationService.MarkAsProcessedAsync(id);
        }
    }
}