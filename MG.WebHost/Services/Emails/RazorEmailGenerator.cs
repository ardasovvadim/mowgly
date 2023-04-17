using MG.WebHost.Contracts.Emails;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace MG.WebHost.Services.Emails;

public class RazorEmailGenerator : IEmailGenerator
{
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IRazorViewEngine _razorViewEngine;
    private readonly ITempDataProvider _tempDataProvider;
    private readonly ILogger<RazorEmailGenerator> _logger;

    public RazorEmailGenerator(
        IHttpContextAccessor contextAccessor,
        IRazorViewEngine razorViewEngine,
        ITempDataProvider tempDataProvider, 
        ILogger<RazorEmailGenerator> logger
        )
    {
        _contextAccessor = contextAccessor;
        _razorViewEngine = razorViewEngine;
        _tempDataProvider = tempDataProvider;
        _logger = logger;
    }

    public async Task<string> GenerateEmailAsync(EmailType type, object model)
    {
        var viewName = ResolveViewNameByType(type);
        // TODO: review action context for background jobs
        var actionContext = new ActionContext(_contextAccessor.HttpContext, new RouteData(), new ActionDescriptor());
        var viewEngineResult = _razorViewEngine.FindView(actionContext, viewName, isMainPage: false);

        if (!viewEngineResult.Success)
        {
            _logger.LogError("Couldn't find template '{viewName}'", viewName);
            throw new InvalidOperationException();
        }

        var viewData = new ViewDataDictionary(
            new EmptyModelMetadataProvider(),
            new ModelStateDictionary()
        ) {
            Model = model
        };

        await using var writer = new StringWriter();
        var viewContext = new ViewContext(
            actionContext,
            viewEngineResult.View,
            viewData,
            new TempDataDictionary(actionContext.HttpContext, _tempDataProvider),
            writer,
            new HtmlHelperOptions()
        );

        await viewEngineResult.View.RenderAsync(viewContext);

        return writer.ToString();
    }

    private string ResolveViewNameByType(EmailType type)
    {
        switch (type)
        {
            // TODO
            default:
                return "EmailTemplates/TestEmailTemplate";
        }
    }
}