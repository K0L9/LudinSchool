﻿using LudinSchool.Data;
using LudinSchool.Models;
using LudinSchool.Models.DTO.Images;
using LudinSchool.Models.DTO.News;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace LudinSchool.Services
{
    public class ImageService
    {
        private readonly AppDbContext _db;

        public ImageService(AppDbContext db)
        {
            _db = db;
        }

        public AddImageResponseDTO SaveImage(AddImageDTO imageDTO)
        {
            try
            {
                string base64Str = imageDTO.Base64;
                string fileExtension = base64Str.Substring(base64Str.IndexOf('/') + 1, base64Str.IndexOf(';') - base64Str.IndexOf('/') - 1);
                string base64CuttedStr = base64Str.Substring(base64Str.IndexOf(',') + 1);
                string fileName = Guid.NewGuid().ToString() + '.' + fileExtension;
                File.WriteAllBytes(ENV.ImagesPath + fileName, Convert.FromBase64String(base64CuttedStr));

                _db.Images.Add(new Image() { FileName = fileName });
                _db.SaveChanges();
                return new AddImageResponseDTO() { FileName = fileName};
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void DeleteImage(DeleteImageDTO imageDTO)
        {
            try
            {
                var image = _db.Images.SingleOrDefault(x => x.FileName == imageDTO.FileName);
                if (image == null)
                    throw new Exception("Фото в бд не знайдена");

                _db.Images.Remove(image);

                string filePath = ENV.ImagesPath + imageDTO.FileName;
                
                if (File.Exists(filePath))
                    File.Delete(filePath);
                else
                    throw new Exception("Файл для видалення не знайдений");

                _db.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void ConnectImageToNews(ConnectImageToNewsDTO dto)
        {
            var news = _db.News.SingleOrDefault(x => x.Id == dto.NewsId);
            if (news == null)
                throw new Exception("News are not founded");

            var image = _db.Images.FirstOrDefault(x => x.FileName == dto.FileName);
            if (image == null)
                throw new Exception("Image are not founded");

            image.NewsId = news.Id;
            _db.SaveChanges();
        }
        public void ConnectImagesToNews(ConnectImagesToNewsDTO dto)
        {
            var news = _db.News.SingleOrDefault(x => x.Id == dto.NewsId);
            if (news == null)
                throw new Exception("News are not founded");

            foreach (var el in dto.FileNames)
            {
                var image = _db.Images.FirstOrDefault(x => x.FileName == el);
                if (image == null)
                    throw new Exception("Image are not founded");

                image.NewsId = news.Id;
            }

            _db.SaveChanges();
        }
        public IEnumerable<string> GetImagesOfNews(int newsId)
        {
            var news = _db.News.SingleOrDefault(x => x.Id == newsId);
            if (news == null)
                throw new Exception("News not found");

            var result = news.Images.Select(x => x.FileName).ToList();
            return result;
        }
    }
}
