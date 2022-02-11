namespace LudinSchool.Models.DTO.News
{
    public class EditNewsDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string SmallContent { get; set; }
        public int? NewsCategoryId { get; set; }
    }
}
