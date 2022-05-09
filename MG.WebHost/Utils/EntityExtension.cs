using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Interfaces;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Users;
using MG.WebHost.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace MG.WebHost.Utils;

public static class EntityExtension
{
    public static IQueryable<TSource> WhereIf<TSource>(this IQueryable<TSource> source, bool execute, Expression<Func<TSource, bool>> predicate)
    {
        return execute ? source.Where(predicate) : source;
    }

    public static bool IsNullOrEmpty(this string str) => string.IsNullOrEmpty(str);

    public static string ConcatName(this User user)
    {
        if (user == null)
            return string.Empty;
        
        var str = new StringBuilder();
        if (!user.LastName.IsNullOrEmpty())
            str.Append(user.LastName);
        if (!user.FirstName.IsNullOrEmpty())
            str.Append(" " + user.FirstName);
        if (!user.MiddleName.IsNullOrEmpty())
            str.Append(" " + user.MiddleName);

        return str.ToString().Trim();
    }
    
    public static void ApplyGlobalFilters(this ModelBuilder modelBuilder, Expression<Func<BaseEntity, bool>> expression)
    {
        var exceptTypes = new List<Type> { typeof(SectionSetting), typeof(UserProfile) };
        
        var entities = modelBuilder.Model
            .GetEntityTypes()
            .Where(e => e.ClrType.IsSubclassOf(typeof(BaseEntity)) && !exceptTypes.Contains(e.ClrType))
            .Select(e => e.ClrType);
        foreach (var entity in entities)
        {
            var newParam = Expression.Parameter(entity);
            var newbody = ReplacingExpressionVisitor.Replace(expression.Parameters.Single(), newParam, expression.Body);    
            modelBuilder.Entity(entity).HasQueryFilter(Expression.Lambda(newbody, newParam));
        }
    }

    public static IQueryable<T> Page<T>(this IQueryable<T> query, PageRequest request) where T : IBaseEntity
    {
        if (request is null)
            return query;

        var q = request.PageSize > 0 
            ? query.Skip(request.PageNumber * request.PageSize).Take(request.PageSize) 
            : query;

        if (!request.Sort.IsNullOrEmpty())
        {
            switch (request.SortOrder)
            {
                case SortOrder.Asc: ;
                    q = q.OrderByDynamic(x => $"x.{request.Sort}");
                    break;
                case SortOrder.Desc:
                    q = q.OrderByDescendingDynamic(x => $"x.{request.Sort}");
                    break;
            }
        }
        else
        {
            switch (request.SortOrder)
            {
                case SortOrder.Asc: ;
                    q = q.OrderBy(e => e);
                    break;
                case SortOrder.Desc:
                    q = q.OrderByDescendingDynamic(request.Sort);
                    break;
            }
        }

        return q;
    }
}