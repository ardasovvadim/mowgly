using System.Linq;
using AutoMapper;
using MG.WebApi.Entities;
using MG.WebAPi.Entities.Enums;
using MG.WebApi.Entities.Events;
using MG.WebApi.Entities.News;
using MG.WebApi.Entities.Sections;
using MG.WebApi.Entities.Tournaments;
using MG.WebApi.Entities.Users;
using MG.WebAPi.Models;
using MG.WebAPi.Models.Events;
using MG.WebApi.Models.Locations;
using MG.WebAPi.Models.Masters;
using MG.WebAPi.Models.News;
using MG.WebAPi.Models.Registrations;
using MG.WebAPi.Models.Sections;
using MG.WebApi.Models.TimetableRecords;
using MG.WebAPi.Models.Tournaments;
using MG.WebAPi.Utils;

namespace MG.WebAPi.Maps
{
    public class MgProfile : Profile
    {
        public MgProfile()
        {
            CreateMap<Location, LocationVm>()
                .ReverseMap();
            CreateMap<Section, SectionVm>();
            CreateMap<TimetableRecord, TimetableRecordVm>();
            CreateMap<TimetableRecord, TimetableRecordEditModel>();
            CreateMap<GeneralSetting, GeneralSettingVm>();
            CreateMap<User, MasterVm>()
                .ForMember(d => d.Name, o => o.MapFrom(s => $"{s.FirstName} {s.LastName} {s.MiddleName}"));
            CreateMap<RegistrationDto, User>()
                .ForMember(d => d.UserTypes, o => o.MapFrom(s => s.IsParent ? UserType.Parent : UserType.Student));
            CreateMap<User, MasterEditModel>()
                .ForMember(d => d.Phone, o => o.MapFrom(s => s.PhoneNumber))
                .ReverseMap()
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(s => s.Phone));

            CreateMap<Tournament, TournamentVm>()
                .AfterMap((entity, dto) =>
                {
                    dto.Results = dto.Results.OrderBy(r => r.Place).ToList();
                });
            CreateMap<TournamentResult, TournamentResultVm>()
                .ForMember(d => d.Student, o => o.MapFrom(s => new IdName{ Id = s.UserId, Name = $"{s.User.FirstName} {s.User.LastName} {s.User.MiddleName}"}));
            
            CreateMap<TournamentResultEditModel, TournamentResult>()
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.Student.Id))
                .ReverseMap()
                .ForMember(d => d.Student, o => o.MapFrom(s => new IdName{Id = s.User.Id, Name = s.User.ConcatName()}));

            CreateMap<TournamentEditModel, Tournament>()
                .ReverseMap();

            CreateMap<News, NewsVm>()
                .ForMember(d => d.Author, o => o.MapFrom(s => s.Author.ConcatName()))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.PublishedDate))
                ;
            
            CreateMap<News, NewsDetailsVm>()
                .ForMember(d => d.Author, o => o.MapFrom(s => s.Author.ConcatName()))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.PublishedDate))
                ;
            
            CreateMap<News, NewsDetailsEditModel>()
                .ForMember(d => d.Author, o => o.MapFrom(s => s.Author.ConcatName()))
                .ForMember(d => d.CreatedDate, o => o.MapFrom(s => s.PublishedDate))
                .ReverseMap()
                .ForMember(d => d.Author, o => o.Ignore())
                ;

            CreateMap<Event, EventVm>()
                .ReverseMap()
                ;
        }
    }
}