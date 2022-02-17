import { LegacyRef, useRef, useState } from "react";

import Cropper from "cropperjs";
import { useEffect } from "react";
import Modal from "../modal";

import "cropperjs/dist/cropper.css";

export interface ICropperProps {
  onSubmitProduct: (base64: string) => any;
}

const CropperWindow = ({ onSubmitProduct }: ICropperProps) => {
  const defaultImgSrc = "/Images/default/selectImagePlus.png";
  const imgRef = useRef<HTMLImageElement>(null);
  const [cropperObj, setCropperObj] = useState<Cropper | null>();
  const [imgSrc, setImg] = useState<string>(defaultImgSrc);
  const [base64, setBase64] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const [isLoad, setLoad] = useState<boolean>(false);

  const getBase64 = async () => {
    const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
    setBase64(base);
    setShowModal(false);
    setLoad(true);
    await onSubmitProduct(base);
    setLoad(false);
  };
  const modalCancel = () => {
    setCropperObj(null);
    setShowModal(false);
  };
  const handleImageChange = async (e: any) => {
    const file = (e.target.files as FileList)[0];
    if (file) {
      const url = URL.createObjectURL(file);
      await setImg(url);
      setShowModal(true);
      const cropper = new Cropper(imgRef.current as HTMLImageElement, {
        aspectRatio: 16 / 9,
        viewMode: 1,
      });
      cropperObj?.replace(url);
      setCropperObj(cropper);
      e.target.value = "";
    }
  };

  return (
    <>
      {isLoad ? (
        <img src="/Images/default/imageLoading.gif" alt="loading..." />
      ) : (
        <>
          <input
            type="file"
            accept=".gif,.jpg,.jpeg,.png"
            className="displayNone"
            id="inputFile"
            onChange={handleImageChange}
          />
          <label htmlFor="inputFile">
            <img src={defaultImgSrc} className="addImageBtn" />
          </label>
          <Modal
            onOk={getBase64}
            visible={showModal}
            onCancel={modalCancel}
            width={1000}
          >
            <div>
              <img ref={imgRef as LegacyRef<HTMLImageElement>} src={imgSrc} />
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default CropperWindow;
