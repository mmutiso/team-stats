namespace TeamStats.Web.ApiModels
{
    public record ConfirmUserLoginModel
    {
        [Required]
        public string Email { get; init; }
        [Required]
        public string ConfirmationToken { get; set; }
    }
}