using System.Runtime.Serialization;
using Microsoft.AspNetCore.Identity;

namespace MG.WebHost.Exceptions;

public class BusinessException : Exception
{
    public BusinessException()
    {
    }

    protected BusinessException(SerializationInfo info, StreamingContext context) : base(info, context)
    {
    }

    public BusinessException(string message) : base(message)
    {
    }

    public BusinessException(string message, Exception innerException) : base(message, innerException)
    {
    }

    // todo
    public BusinessException(IdentityResult message) : base()
    {
    }
}