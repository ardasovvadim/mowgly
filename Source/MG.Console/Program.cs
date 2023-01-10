// See https://aka.ms/new-console-template for more information

using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;

var smtpServer = "smtp-relay.sendinblue.com";
var port = 587;
var login = "ardasovvadim@gmail.com";
var password = "8QTzx9pS2wknMvIP";

using var smtpClient = new SmtpClient();

Console.WriteLine("Connecting to SMTP server...");
await smtpClient.ConnectAsync(smtpServer, port, false);

Console.WriteLine("Authenticating...");
await smtpClient.AuthenticateAsync(login, password);

var message = new MimeMessage();
message.From.Add(new MailboxAddress("Vadim Admin", "ardasovvadim@ardasovvadim.space"));
message.To.Add(new MailboxAddress("Olha", "olha.koshlata@gmail.com"));
message.Subject = "Test email from C#";
message.Body = new TextPart(TextFormat.Plain) { Text = "Hello, world!" };

Console.WriteLine("Sending message...");
await smtpClient.SendAsync(message);

Console.WriteLine("Disconnecting...");
await smtpClient.DisconnectAsync(true);

Console.WriteLine("Done.");
