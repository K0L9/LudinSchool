namespace LudinSchool.Models.DTO.News
{
    public class AddNewsDTO
    {
        public string Title { get; set; }
        public string SmallContent { get; set; }
        public string Content { get; set; }
        public int NewsCategoryId { get; set; }
    }
}
