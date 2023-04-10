// See https://aka.ms/new-console-template for more information

using SendGrid;
using SendGrid.Helpers.Mail;

var apiKey = "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";
var client = new SendGridClient(apiKey);
var from = new EmailAddress("ardasovvadim@gmail.com", "Vadim Ardasov Sender");
var subject = "Sending with SendGrid is Fun";
var to = new EmailAddress("vadym.ardasov@nure.ua", "Vadim Ardasov Receiver");
var plainTextContent = "and easy to do anywhere, even with C#";
var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
var response = await client.SendEmailAsync(msg);

Console.WriteLine("Is success: " + response.IsSuccessStatusCode);
