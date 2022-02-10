using AutoMapper;
using LudinSchool.Data;
using LudinSchool.Models;
using LudinSchool.Models.DTO.News;
using LudinSchool.Services.Static.Translit;
using System.Collections.Generic;
using System.Linq;

namespace LudinSchool.Services
{
    public class NewsService
    {
        AppDbContext _db;
        Mapper mapper;
        public NewsService(AppDbContext db)
        {
            _db = db;

            var mapperConf = new MapperConfiguration(cfg => cfg.CreateMap<AddNewsDTO, News>());
            mapper = new Mapper(mapperConf);
        }

        public IEnumerable<News> GetAllNews()
        {
            try
            {
                return _db.News;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async void AddNews(AddNewsDTO newsDTO)
        {
            try
            {
                if (_db.NewsCategories.Count() < 1)
                    throw new System.Exception("No one category type");

                TranslitMethods.Translitter translitor = new TranslitMethods.Translitter();
                string slug = translitor.Translit(newsDTO.Title, TranslitMethods.TranslitType.Iso);

                if (_db.News.FirstOrDefault(x => x.Slug == slug) != null)
                    throw new System.Exception("This slug are exist");

                News news = mapper.Map<News>(newsDTO);
                news.Date = System.DateTime.Now;
                news.Slug = slug;
                await _db.News.AddAsync(news);
                _db.SaveChanges();
            }
            catch (System.Exception)
            {
                throw;
            }
        }
    }
}
