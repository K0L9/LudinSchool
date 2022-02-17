using LudinSchool.Models.DTO.Images;
using LudinSchool.Models.DTO.News;
using LudinSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LudinSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ImageService _imageService;

        public ImageController(ImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("add-image")]
        public IActionResult LoadImage([FromBody] AddImageDTO imageDTO)
        {
            try
            {
                AddImageResponseDTO fileName = _imageService.SaveImage(imageDTO);
                return Ok(fileName);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("delete-image")]
        public IActionResult DeleteImage([FromBody] DeleteImageDTO imageDTO)
        {
            try
            {
                _imageService.DeleteImage(imageDTO);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("connect-image-news")]
        public IActionResult ConnectImage([FromBody] ConnectImageToNewsDTO dto)
        {
            try
            {
                _imageService.ConnectImageToNews(dto);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("connect-images-news")]
        public IActionResult ConnectImages([FromBody] ConnectImagesToNewsDTO dto)
        {
            try
            {
                _imageService.ConnectImagesToNews(dto);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("get-images-news")]
        public IActionResult GetImagesOfCurrentNews(int imageId)
        {
            try
            {
                return Ok(_imageService.GetImagesOfNews(imageId));
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

