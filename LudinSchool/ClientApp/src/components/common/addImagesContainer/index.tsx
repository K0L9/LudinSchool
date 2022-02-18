import { useState } from "react";
import { IImage, IImageDTO } from "../../admin/news/types";
import CropperWindow from "../cropper";

//icons
import { BiPaste } from "react-icons/bi";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

import { AdminNewsService } from "../../admin/news/service";
import { toast } from "react-toastify";

export interface IImagesContainerProps {
  defaultImages: Array<IImage>;
  setImageToTiny: (fileName: string) => any;
  loadImagesToParent: (images: Array<IImage>) => any;
}

const AddImagesContainer = ({
  defaultImages,
  setImageToTiny,
  loadImagesToParent,
}: IImagesContainerProps) => {
  const [images, setImages] = useState<Array<IImage>>(defaultImages);
  const service: AdminNewsService = new AdminNewsService();

  const handleImageUp = (id: number) => {
    let tmpImages = images.slice();
    if (id == 0) return;
    let tmp = tmpImages[id].fileName;
    tmpImages[id].fileName = tmpImages[id - 1].fileName;
    tmpImages[id - 1].fileName = tmp;
    setImages(tmpImages);
    loadImagesToParent(tmpImages);
  };
  const handleImageDown = (id: number) => {
    let tmpImages = images.slice();
    if (id == tmpImages.length - 1) return;
    let tmp = tmpImages[id].fileName;
    tmpImages[id].fileName = tmpImages[id + 1].fileName;
    tmpImages[id + 1].fileName = tmp;
    setImages(tmpImages);
    loadImagesToParent(tmpImages);
  };
  const handleImageLoad = async (base64: string) => {
    const body: IImageDTO = { base64 };
    await service
      .loadImage(body)
      .then((imageResponse) => {
        let tmpImages = images.slice();
        tmpImages.push(imageResponse);
        setImages(tmpImages);
        loadImagesToParent(tmpImages);
      })
      .catch((error) => {
        const errorMessage =
          (error as string) !== null && (error as string) !== undefined
            ? (error as string)
            : "Виникли помилки. Перевірте дані, спробуйте ще раз та зверніться до адміна";
        toast.error(errorMessage as string);
      });
  };
  const handleImageDelete = async (fileName: string) => {
    setImages(images.filter((x) => x.fileName !== fileName));
    service.deleteImage({ fileName: fileName });
  };

  return (
    <div className="imagesContainer">
      {images.map((element, id) => {
        return (
          <div className="divImage" key={id}>
            <img key={id} src={`/Images/${element.fileName}`} />
            <div className="middle">
              <BiPaste
                className="icon"
                onClick={() => setImageToTiny(element.fileName)}
              />
              <AiOutlineArrowUp
                className="icon"
                onClick={() => handleImageUp(id)}
              />
              <AiOutlineArrowDown
                className="icon"
                onClick={() => handleImageDown(id)}
              />
              <BsFillTrashFill
                className="icon"
                onClick={() => handleImageDelete(element.fileName)}
              />
            </div>
          </div>
        );
      })}
      <CropperWindow onSubmitProduct={handleImageLoad} />
    </div>
  );
};

export default AddImagesContainer;
