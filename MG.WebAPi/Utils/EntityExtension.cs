using System;
using System.Linq;
using System.Linq.Expressions;

namespace MG.WebAPi.Utils;

public static class EntityExtension
{
    public static IQueryable<TSource> WhereIf<TSource>(this IQueryable<TSource> source, bool execute, Expression<Func<TSource, bool>> predicate)
    {
        return execute ? source.Where(predicate) : source;
    }

    public static bool IsNullOrEmpty(this string str) => string.IsNullOrEmpty(str);
}