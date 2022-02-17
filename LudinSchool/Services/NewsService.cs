using AutoMapper;
using LudinSchool.Data;
using LudinSchool.Models;
using LudinSchool.Models.DTO.News;
using LudinSchool.Models.VM;
using LudinSchool.Services.Static.Translit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LudinSchool.Services
{
    public class NewsService
    {
        AppDbContext _db;
        Mapper mapper;
        public NewsService(AppDbContext db)
        {
            _db = db;

            var mapperConf = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<AddNewsDTO, News>();
                cfg.CreateMap<EditNewsDTO, News>();
            });
            mapper = new Mapper(mapperConf);
        }

        public async Task<IEnumerable<ShortNewsVM>> GetAllNews()
        {
            try
            {
                if (_db.News.Count() == 0)
                    return new List<ShortNewsVM>();

                var news = await _db.News.Select(x => new ShortNewsVM()
                {
                    Slug = x.Slug,
                    Title = x.Title,
                    SmallContent = x.SmallContent,
                    CategoryName = x.NewsCategory.Name,
                    Date = x.Date,
                    ImagePath = x.Images.Count() == 0 ? null : x.Images.Select(x => x.FileName).ToArray()[0],
                }).ToListAsync();

                return news;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<PaginatedNewsVM> GetPaginatedNews(int pageSize, int pageCount)
        {
            try
            {
                var result = new PaginatedNewsVM();
                if (_db.News.Count() == 0)
                    return result;

                result.TotalPages = (int)Math.Round(((double)_db.News.Count()) / pageSize, MidpointRounding.ToPositiveInfinity);
                result.IsLast = pageCount == result.TotalPages;

                var paginatedNews = await _db.News.Select(x => new ShortNewsVM()
                {
                    Slug = x.Slug,
                    Title = x.Title,
                    SmallContent = x.SmallContent,
                    CategoryName = x.NewsCategory.Name,
                    Date = x.Date,
                    ImagePath = x.Images.Count() == 0 ? null : x.Images.Select(x => x.FileName).ToArray()[0],
                })
                    .Skip(pageSize * (pageCount - 1))
                    .Take(pageSize)
                    .ToListAsync();

                result.News = paginatedNews;

                return result;
            }
            catch (System.Exception)
            {
                throw;
            }
        }
        public async Task<News> GetNewsDetail(int id)
        {
            try
            {
                News news = await _db.News.FindAsync(id);
                if (news == null)
                    throw new System.Exception("Not found");

                return news;
            }
            catch (System.Exception)
            {

                throw;
            }
        }
        public async Task<News> GetNewsDetailBySlug(string slug)
        {
            try
            {
                News news = await _db.News.FirstOrDefaultAsync(x => x.Slug == slug);
                if (news == null)
                    throw new System.Exception("Not found");

                return news;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public async Task<int> AddNews(AddNewsDTO newsDTO)
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
                var result = await _db.News.AddAsync(news);
                _db.SaveChanges();

                return result.Entity.Id;
            }
            catch (System.Exception)
            {
                throw;
            }
        }

        public void DeleteNews(int id)
        {
            try
            {
                var news = _db.News.SingleOrDefault(x => x.Id == id);
                var imgsNews = _db.Images.Where(x => x.NewsId == news.Id);
                foreach (var el in imgsNews)
                    _db.Images.Remove(el);

                if (news == null)
                    throw new System.Exception("Not found");

                _db.News.Remove(news);
                _db.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void EditNews(EditNewsDTO dto)
        {
            try
            {
                var newsInDb = _db.News.SingleOrDefault(x => x.Id == dto.Id);
                if (newsInDb == null)
                    throw new Exception("Not found");

                newsInDb.NewsCategoryId = (int)dto.NewsCategoryId;
                newsInDb.Title = dto.Title;
                newsInDb.Content = dto.Content;
                newsInDb.SmallContent = dto.SmallContent;

                _db.News.Update(newsInDb);
                _db.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
