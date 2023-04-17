using MG.WebHost.Contracts.Locations;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Sections;

namespace MG.WebHost.Services.Locations;

public class LocationService : BaseService, ILocationService
{
    public LocationService(IServiceProvider serviceProvider) : base(serviceProvider)
    {
    }

    public async Task<LocationEditModel> Save(LocationEditModel request)
    {
        var isNew = !request.Id.HasValue;
        var locationRepo = Repository<Location>();
        var sectionRepository = Repository<Section>();
        var entity = isNew
            ? new Location()
            : await locationRepo.GetByIdAsync(request.Id.Value, nameof(Location.Sections));
        
        Mapper.Map(request, entity);

        if (request.Sections != null)
        {
            var sections = await sectionRepository.GetAsync(s => request.Sections.Select(s2 => s2.Id).Contains(s.Id));
            foreach (var section in sections)
                if (!entity.Sections.Contains(section))
                    entity.Sections.Add(section);
            
            if (!isNew)
                foreach (var section in entity.Sections)
                    if (request.Sections.All(s => s.Id != section.Id))
                        entity.Sections.Remove(section);
        }

        if (isNew)
            await locationRepo.InsertAsync(entity);
        else
            locationRepo.Update(entity);

        await locationRepo.SaveChangesAsync();

        return Mapper.Map<Location, LocationEditModel>(entity);
    }
}