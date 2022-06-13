using System.Linq.Expressions;
using System.Text;
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
    public static bool IsNotNullOrEmpty(this string str) => !string.IsNullOrEmpty(str);

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
    
    public static string EscapeSymbols(this string str)
    {
        var symbols = "_*[]()~`>#+-=|{}.!";
        var strBuilder = new StringBuilder(str);
        
        foreach (var t in symbols)
        {
            var s = t.ToString();
            strBuilder.Replace(s, "\\" + s);
        }

        return strBuilder.ToString();
    } 
    
    public static void ApplyGlobalFilters(this ModelBuilder modelBuilder, Expression<Func<IBaseEntity, bool>> expression)
    {
        var exceptTypes = new List<Type> { typeof(SectionSetting), typeof(UserProfile) };
        
        var entities = modelBuilder.Model
            .GetEntityTypes()
            .Where(e => e.ClrType.IsAssignableTo(typeof(IBaseEntity)) && !exceptTypes.Contains(e.ClrType))
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

        var q = query;

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
                    q = q.OrderBy(e => e.CreatedDate);
                    break;
                case SortOrder.Desc:
                    q = q.OrderByDescending(e => e.CreatedDate);
                    break;
            }
        }

        return request.PageSize > 0 
            ? q.Skip(request.PageNumber * request.PageSize).Take(request.PageSize) 
            : q;
    }

    public static IQueryable<TEntity> WhereIf<TEntity>(
        this IQueryable<TEntity> source, 
        bool execute, 
        Func<IQueryable<TEntity>,IQueryable<TEntity>> predicate) where TEntity : class, IBaseEntity
    {
        return execute ? predicate(source) : source;
    }

    public static IQueryable<TEntity> IncludeIf<TEntity>(
        this IQueryable<TEntity> source,
        bool predicate,
        string include) where TEntity : class
    {
        return predicate ? source.Include(include) : source;
    }
}