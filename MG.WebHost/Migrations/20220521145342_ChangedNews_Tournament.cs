using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MG.WebHost.Migrations
{
    public partial class ChangedNews_Tournament : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_News_TournamentId",
                table: "News");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("22d3c683-ebc5-4809-aa2e-4b379d380324"));

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Birthday", "ConcurrencyStamp", "CreatedDate", "Deleted", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "MiddleName", "NormalizedEmail", "NormalizedName", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UpdatedDate", "UserName", "UserTypes" },
                values: new object[] { new Guid("8a6b2abf-2bad-4066-8bfb-6a5d356a6466"), 0, null, "11c29d0f-4413-41c5-b8f2-671297e2a034", new DateTime(2022, 5, 21, 14, 53, 42, 634, DateTimeKind.Utc).AddTicks(480), false, "ardasovvadim@gmail.com", false, null, null, false, null, null, null, null, null, null, null, false, null, false, new DateTime(2022, 5, 21, 14, 53, 42, 634, DateTimeKind.Utc).AddTicks(480), null, 8 });

            migrationBuilder.CreateIndex(
                name: "IX_News_TournamentId",
                table: "News",
                column: "TournamentId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_News_TournamentId",
                table: "News");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("8a6b2abf-2bad-4066-8bfb-6a5d356a6466"));

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Birthday", "ConcurrencyStamp", "CreatedDate", "Deleted", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "MiddleName", "NormalizedEmail", "NormalizedName", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UpdatedDate", "UserName", "UserTypes" },
                values: new object[] { new Guid("22d3c683-ebc5-4809-aa2e-4b379d380324"), 0, null, "93d9f810-ac22-46e6-a1a7-67f1c98a1e26", new DateTime(2022, 5, 17, 19, 53, 12, 184, DateTimeKind.Utc).AddTicks(7630), false, "ardasovvadim@gmail.com", false, null, null, false, null, null, null, "", null, null, null, false, "64787ee8-e22e-4517-b6a0-8417990db8e6", false, new DateTime(2022, 5, 17, 19, 53, 12, 184, DateTimeKind.Utc).AddTicks(7630), null, 8 });

            migrationBuilder.CreateIndex(
                name: "IX_News_TournamentId",
                table: "News",
                column: "TournamentId");
        }
    }
}
