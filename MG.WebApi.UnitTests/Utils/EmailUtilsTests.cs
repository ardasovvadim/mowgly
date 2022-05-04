using System.Collections.Generic;
using MG.WebHost.Utils;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MG.WebApi.UnitTests.Utils
{
    [TestClass]
    public class EmailUtilsTests
    {
        private readonly IEmailUtils emailUtils = new EmailUtils();

        [TestMethod]
        public void GenerateEmailBody_ShouldInterpolateString_WhenSimpleValue()
        {
            const string expectedResult = "1";
            const string input = "{{obj}}";
            var objects = new Dictionary<string, object>
            {
                ["obj"] = 1
            };

            var actualResult = emailUtils.GenerateEmailBody(input, objects);
            
            Assert.AreEqual(expectedResult, actualResult);
        }
        
        [TestMethod]
        public void GenerateEmailBody_ShouldInterpolateString_WhenInnerObject()
        {
            const string expectedResult = "VADIM";
            const string input = "{{obj.name}}";
            var objects = new Dictionary<string, object>
            {
                ["obj"] = new {name = "VADIM"}
            };

            var actualResult = emailUtils.GenerateEmailBody(input, objects);
            
            Assert.AreEqual(expectedResult, actualResult);
        }
        
        [TestMethod]
        public void GenerateEmailBody_ShouldInterpolateString_WhenNestedInnerObject()
        {
            const string expectedResult = "VADIM";
            const string input = "{{obj.prop1.prop2.name}}";
            var objects = new Dictionary<string, object>
            {
                ["obj"] = new {prop1 = new {prop2 = new {name = "VADIM"}}}
            };

            var actualResult = emailUtils.GenerateEmailBody(input, objects);
            
            Assert.AreEqual(expectedResult, actualResult);
        }
    }
}