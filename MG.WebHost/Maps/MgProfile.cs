using System.Configuration;
using AutoMapper;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.News;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using MG.WebHost.Models.Events;
using MG.WebHost.Models.Locations;
using MG.WebHost.Models.Masters;
using MG.WebHost.Models.News;
using MG.WebHost.Models.Registrations;
using MG.WebHost.Models.Sections;
using MG.WebHost.Models.TimetableRecords;
using MG.WebHost.Models.Tournaments;
using MG.WebHost.Utils;

namespace MG.WebHost.Maps
{
    public class MgProfile : Profile
    {
        public MgProfile()
        {
            CreateMap<Location, LocationVm>()
                .ReverseMap();
            CreateMap<Section, SectionVm>()
                .ForMember(d => d.Profiles, o => o.MapFrom(s => s.Settings))
                .ReverseMap();

            CreateMap<Location, LocationEditModel>()
                .ForMember(d => d.Sections, o => o.MapFrom(s => s.Sections.Select(sec => new IdName(sec.Id, sec.Name))))
                .ReverseMap()
                .ForMember(d => d.Sections, o => o.Ignore());
            
                // .ForMember(d => d.Settings, o => o.MapFrom(s => s.Profiles));
            CreateMap<GeneralSettingVm, SectionSetting>()
                .ReverseMap();
            CreateMap<Section, AdminSectionVm>()
                .ForMember(d => d.MasterCount, o => o.MapFrom(s => s.TimetableRecords.Select(t => t.MasterId).Distinct().Count()));
            CreateMap<TimetableRecord, TimetableRecordVm>();
            CreateMap<TimetableRecord, TimetableRecordEditModel>()
                .ReverseMap()
                .ForMember(d => d.Id, s => s.Ignore());
            CreateMap<GeneralSetting, GeneralSettingVm>()
                .ReverseMap();
            CreateMap<UserProfile, GeneralSettingVm>()
                .ReverseMap();
            CreateMap<User, MasterVm>()
                .ForMember(d => d.Name, o => o.MapFrom(s => $"{s.FirstName} {s.LastName} {s.MiddleName}"));
            CreateMap<RegistrationDto, User>()
                .ForMember(d => d.UserTypes, o => o.MapFrom(s => s.IsParent ? UserType.Parent : UserType.Student));
            
            CreateMap<User, MasterEditModel>()
                .ForMember(d => d.Phone, o => o.MapFrom(s => s.PhoneNumber))
                .ReverseMap()
                .ForMember(d => d.Id, o => o.Ignore())
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(s => s.Phone))
                .AfterMap((s, d, c) =>
                {
                    d.SetName(s.FirstName, s.LastName, s.MiddleName);
                })
                ;

            CreateMap<Tournament, TournamentVm>()
                .AfterMap((entity, dto) => { dto.Results = dto.Results.OrderBy(r => r.Place).ToList(); });
            CreateMap<TournamentResult, TournamentResultVm>()
                .ForMember(d => d.Student, o => o.MapFrom(s => new IdName { Id = s.UserId, Name = $"{s.User.FirstName} {s.User.LastName} {s.User.MiddleName}" }));

            CreateMap<TournamentResultEditModel, TournamentResult>()
                .ForMember(d => d.UserId, o => o.MapFrom(s => s.Student.Id))
                .ReverseMap()
                .ForMember(d => d.Student, o => o.MapFrom(s => new IdName { Id = s.User.Id, Name = s.User.ConcatName() }));

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

            CreateMap<User, AdminMasterVm>()
                .ForMember(s => s.Name, o => o.MapFrom(s => s.ConcatName()))
                .ForMember(d => d.Sections, o => o.MapFrom(s => string.Join(", ", s.TimetableRecords.DistinctBy(t => t.SectionId).Select(x => x.Section.Name))));

            CreateMap<Tournament, EventVm>()
                .ForMember(d => d.TournamentName, o => o.MapFrom(s => s.Name))
                .ForMember(d => d.NewsId, o => o.MapFrom(s => s.News.Id))
                .ReverseMap()
                .ForMember(d => d.Name, o => o.Ignore())
                .AfterMap((e, t) => t.SetName(e.TournamentName))
                ;

            CreateMap<News, AdminNewsVm>()
                .ForMember(d => d.AuthorName, o => o.MapFrom(s => s.Author.ConcatName()));
        }
    }
}