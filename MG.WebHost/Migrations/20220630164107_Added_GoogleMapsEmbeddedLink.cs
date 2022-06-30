using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MG.WebHost.Migrations
{
    public partial class Added_GoogleMapsEmbeddedLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GoogleMapsEmbeddedLink",
                table: "Locations",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoogleMapsEmbeddedLink",
                table: "Locations");
        }
    }
}
