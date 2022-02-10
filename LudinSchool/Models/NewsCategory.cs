using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LudinSchool.Models
{
    public class NewsCategory
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public virtual ICollection<News> News { get; set; }
    }
}
