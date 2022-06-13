using AutoMapper;
using MG.WebHost.Entities;
using MG.WebHost.Exceptions;
using MG.WebHost.Models.Registrations;
using MG.WebHost.Repositories;

namespace MG.WebHost.Services
{
    public interface IRegistrationService
    {
        Task RegistrationAsync(OrderDto dto);
        Task MarkAsProcessedAsync(Guid id);
    }

    public class RegistrationService : IRegistrationService
    {
        private IRepository<Order> Repository { get; }
        private readonly IMapper _mapper;
        private INotifierService NotifierService { get;  }

        public RegistrationService(IMapper mapper, IRepository<Order> repository, INotifierService notifierService)
        {
            _mapper = mapper;
            Repository = repository;
            NotifierService = notifierService;
        }

        public async Task RegistrationAsync(OrderDto dto)
        {
            var order = _mapper.Map<OrderDto, Order>(dto);
            
            await Repository.InsertAsync(order);
            await Repository.SaveChangesAsync();

            await NotifierService.OnNewOrderAsync(order);

            // var admin = await User.GetQueryable().FirstOrDefaultAsync(u => u.UserTypes == UserType.Admin);
            //
            // await _emailService.SendEmailAsync(EmailTemplateKey.AdminRegistration,
            //     "New registration",
            //     admin,
            //     new Dictionary<string, object> { { "user", dto with { Password = null } } });
            // await _emailService.SendEmailAsync(EmailTemplateKey.UserRegistrationResponse,
            //     "Registration",
            //     newUserEntity,
            //     new Dictionary<string, object> { { "user", dto with { Password = null } } });
        }

        public async Task MarkAsProcessedAsync(Guid id)
        {
            var order = await Repository.GetByIdAsync(id);
            
            if (order == null)
                throw new BusinessException("Заявка не найдена");

            order.Processed = true;
            Repository.Update(order);

            await Repository.SaveChangesAsync();
        }
    }
}