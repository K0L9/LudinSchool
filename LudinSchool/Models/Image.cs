using System.ComponentModel.DataAnnotations;

namespace LudinSchool.Models
{
    public class Image
    {
        public int Id { get; set; }
        [Required]
        public string FileName { get; set; }

        //Foreign keys
        public int? NewsId { get; set; }

        //Navigation props
        public News News { get; set; }
    }
}
