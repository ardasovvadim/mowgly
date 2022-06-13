using MG.WebHost.Config;
using MG.WebHost.Entities;
using MG.WebHost.Models;
using MG.WebHost.Models.Roles;
using MG.WebHost.Repositories;
using MG.WebHost.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

namespace MG.WebHost.Controllers;

public class RoleController : BaseController
{
    public RoleController(IRepository<Role> roleRepository, IRepository<Permission> permissionRepository, UserPermissionCache cache)
    {
        RoleRepository = roleRepository;
        PermissionRepository = permissionRepository;
        Cache = cache;
    }

    private IRepository<Role> RoleRepository { get; }
    private IRepository<Permission> PermissionRepository { get; }
    private UserPermissionCache Cache { get; }

    [HttpGet, Authorize(MgPermissions.Role.Get)]
    public async Task<GetRolesResponseDto> GetRolesAsync()
    {
        return new GetRolesResponseDto
        {
            Roles = await RoleRepository.GetQueryable().Include(r => r.Permissions).Select(r => new RoleDto
            {
                Id = r.Id,
                Name = r.Name,
                Permissions = r.Permissions.Select(p => p.Id)
            }).ToListAsync(),
            Permissions = PermissionRepository.GetQueryable().Select(p => new IdName { Id = p.Id, Name = p.Name })
        };
    }

    [HttpPost, Authorize(MgPermissions.Role.Create)]
    public async Task EditAsync(EditRolesRequestDto dto)
    {
        var roles = await RoleRepository.GetQueryable().Include(r => r.Permissions).ToListAsync();
        var permissions = await PermissionRepository.GetQueryable().ToListAsync();
        
        foreach (var dtoRole in dto.Roles)
        {
            var role = roles.FirstOrDefault(r => r.Id == dtoRole.Id);
            
            if (role == null)
                continue;

            role.Permissions
                .Where(p => !dtoRole.Permissions.Contains(p.Id))
                .ToList()
                .ForEach(p => role.Permissions.Remove(p));

            var newPermIds = dtoRole.Permissions.Where(id => role.Permissions.All(p => p.Id != id)).ToList();
            var newPerms = permissions.Where(p => newPermIds.Contains(p.Id)).ToList();
            if (newPerms.Any())
                role.Permissions.AddRange(newPerms);
        }

        await Cache.ClearCacheAsync();

        await RoleRepository.SaveChangesAsync();
    }
}