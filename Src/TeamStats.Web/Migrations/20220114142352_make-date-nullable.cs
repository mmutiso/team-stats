using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TeamStats.Web.Migrations
{
    public partial class makedatenullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "date_registered",
                table: "teams",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_removed",
                table: "team_memberships",
                type: "timestamp without time zone",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone");

            migrationBuilder.AddColumn<Guid>(
                name: "club_id",
                table: "people",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "date_registered",
                table: "clubs",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "ix_people_club_id",
                table: "people",
                column: "club_id");

            migrationBuilder.AddForeignKey(
                name: "fk_people_clubs_club_id",
                table: "people",
                column: "club_id",
                principalTable: "clubs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_people_clubs_club_id",
                table: "people");

            migrationBuilder.DropIndex(
                name: "ix_people_club_id",
                table: "people");

            migrationBuilder.DropColumn(
                name: "date_registered",
                table: "teams");

            migrationBuilder.DropColumn(
                name: "club_id",
                table: "people");

            migrationBuilder.DropColumn(
                name: "date_registered",
                table: "clubs");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_removed",
                table: "team_memberships",
                type: "timestamp without time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "timestamp without time zone",
                oldNullable: true);
        }
    }
}
