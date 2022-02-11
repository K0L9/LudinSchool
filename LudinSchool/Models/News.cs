using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LudinSchool.Models
{
    [Index(nameof(Slug), IsUnique = true)]
    public class News
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string SmallContent { get; set; }
        [Required]
        public string Content { get; set; }
        public DateTime Date { get; set; }
        [Required]
        public string Slug { get; set; }

        //Foreign keys
        public int NewsCategoryId { get; set; }

        //Navigation props
        public virtual NewsCategory NewsCategory{ get; set; }
        public virtual ICollection<Image> Images{ get; set; }

        public News()
        {
            Images = new HashSet<Image>();
        }
    }
}
