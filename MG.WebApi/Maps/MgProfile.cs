using AutoMapper;
using MG.WebApi.Entities;
using MG.WebAPi.Entities.Enums;
using MG.WebApi.Entities.Sections;
using MG.WebAPi.Models;
using MG.WebApi.Models.Locations;
using MG.WebAPi.Models.Masters;
using MG.WebAPi.Models.Registrations;
using MG.WebAPi.Models.Sections;
using MG.WebApi.Models.TimetableRecords;

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
            CreateMap<TimetableRecord, TimetableRecordEditModel>()
                .ForMember(d => d.Time, o => o.MapFrom(s => $"{s.StartTime} - {s.EndTime}"));
            CreateMap<GeneralSetting, GeneralSettingVm>();
            CreateMap<User, MasterVm>()
                .ForMember(d => d.Name, o => o.MapFrom(s => $"{s.FirstName} {s.LastName} {s.MiddleName}"));
            CreateMap<RegistrationDto, User>()
                .ForMember(d => d.UserTypes, o => o.MapFrom(s => s.IsParent ? UserType.Parent : UserType.Student));
            CreateMap<User, MasterEditModel>()
                .ForMember(d => d.Phone, o => o.MapFrom(s => s.PhoneNumber))
                .ReverseMap()
                .ForMember(d => d.PhoneNumber, o => o.MapFrom(s => s.Phone));
        }
    }
}