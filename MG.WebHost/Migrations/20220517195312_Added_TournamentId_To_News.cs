using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MG.WebHost.Migrations
{
    public partial class Added_TournamentId_To_News : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_Sections_SectionId",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_SectionId",
                table: "AspNetUsers");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e979e97c-0e48-46b3-a569-b3f811bfa7ba"));

            migrationBuilder.DropColumn(
                name: "SectionId",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<Guid>(
                name: "TournamentId",
                table: "News",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Birthday", "ConcurrencyStamp", "CreatedDate", "Deleted", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "MiddleName", "NormalizedEmail", "NormalizedName", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UpdatedDate", "UserName", "UserTypes" },
                values: new object[] { new Guid("22d3c683-ebc5-4809-aa2e-4b379d380324"), 0, null, "93d9f810-ac22-46e6-a1a7-67f1c98a1e26", new DateTime(2022, 5, 17, 19, 53, 12, 184, DateTimeKind.Utc).AddTicks(7630), false, "ardasovvadim@gmail.com", false, null, null, false, null, null, null, "", null, null, null, false, "64787ee8-e22e-4517-b6a0-8417990db8e6", false, new DateTime(2022, 5, 17, 19, 53, 12, 184, DateTimeKind.Utc).AddTicks(7630), null, 8 });

            migrationBuilder.CreateIndex(
                name: "IX_News_TournamentId",
                table: "News",
                column: "TournamentId");

            migrationBuilder.AddForeignKey(
                name: "FK_News_Tournaments_TournamentId",
                table: "News",
                column: "TournamentId",
                principalTable: "Tournaments",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_News_Tournaments_TournamentId",
                table: "News");

            migrationBuilder.DropIndex(
                name: "IX_News_TournamentId",
                table: "News");

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("22d3c683-ebc5-4809-aa2e-4b379d380324"));

            migrationBuilder.DropColumn(
                name: "TournamentId",
                table: "News");

            migrationBuilder.AddColumn<Guid>(
                name: "SectionId",
                table: "AspNetUsers",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "Birthday", "ConcurrencyStamp", "CreatedDate", "Deleted", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "MiddleName", "NormalizedEmail", "NormalizedName", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SectionId", "SecurityStamp", "TwoFactorEnabled", "UpdatedDate", "UserName", "UserTypes" },
                values: new object[] { new Guid("e979e97c-0e48-46b3-a569-b3f811bfa7ba"), 0, null, "0a951432-798d-4e64-947c-f0ede533f8f8", new DateTime(2022, 5, 15, 7, 18, 55, 51, DateTimeKind.Utc).AddTicks(9770), false, "ardasovvadim@gmail.com", false, null, null, false, null, null, null, null, null, null, null, false, null, "b0712b18-789a-4f39-9e14-984af1b8ae6c", false, new DateTime(2022, 5, 15, 7, 18, 55, 51, DateTimeKind.Utc).AddTicks(9770), null, 8 });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_SectionId",
                table: "AspNetUsers",
                column: "SectionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_Sections_SectionId",
                table: "AspNetUsers",
                column: "SectionId",
                principalTable: "Sections",
                principalColumn: "Id");
        }
    }
}
