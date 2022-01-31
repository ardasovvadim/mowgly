using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using MG.WebApi.Entities;
using MG.WebApi.Entities.Emails;
using MG.WebAPi.Entities.Enums;
using MG.WebAPi.Models.Registrations;
using MG.WebAPi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace MG.WebAPi.Services
{
    public interface IRegistrationService
    {
        Task RegistrationAsync(RegistrationDto dto);
    }

    public class RegistrationService : IRegistrationService
    {
        private readonly IRepository<User> _userRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;

        public RegistrationService(IRepository<User> userRepository, IMapper mapper, IEmailService emailService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _emailService = emailService;
        }

        public async Task RegistrationAsync(RegistrationDto dto)
        {
            await _userRepository.BeginTransactionAsync();
            
            var newUserEntity = _mapper.Map<User>(dto);
            await _userRepository.InsertAsync(newUserEntity);

            var admin = await _userRepository.GetQueryable().FirstOrDefaultAsync(u => u.UserTypes == UserType.Admin);
            
            await _emailService.SendEmailAsync(EmailTemplateKey.AdminRegistration,
                "New registration",
                admin,
                new Dictionary<string, object> { { "user", dto with { Password = null } } });
            await _emailService.SendEmailAsync(EmailTemplateKey.UserRegistrationResponse,
                "Registration",
                newUserEntity,
                new Dictionary<string, object> { { "user", dto with { Password = null } } });

            await _userRepository.CommitTransactionAsync();
        }
    }
}