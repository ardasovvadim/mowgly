namespace MG.WebHost.Contracts
{
    public record ImageDto
    {
        public string PhysicalImageSubPath { get; set; }
        public string Extension { get; set; }
    }
}