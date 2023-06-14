import { useState } from "react";
import { sanityClient } from "../../utils";

const ImageUploader = ({
  imageAsset,
  setImageAsset,
}: {
  imageAsset: any;
  setImageAsset: (i: any) => void;
}) => {
  const [wrongImageType, setWrongImageType] = useState(false);
  console.log(imageAsset);

  const uploadImage = (e: any) => {
    const { type, name } = e.target.files[0];
    if (
      type === "image/png" ||
      type === "image/svg" ||
      type === "image/jpeg" ||
      type === "image/gif" ||
      type === "image/tiff"
    ) {
      setWrongImageType(false);
      sanityClient.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
        })
        .catch((error) => console.log("Image upload error", error));
    } else {
      setWrongImageType(true);
    }
  };

  return (
    <div>
      <label className="block mb-2">Featured Image</label>
      {wrongImageType && <p className="text-red-600 my-2">Wrong image type!</p>}
      <div className="mb-2">
        <input
          className="block mb-2"
          type="file"
          name="upload-image"
          onChange={uploadImage}
        />
        <small>Use high-quality JPG, SVG, PNG, GIF less than 20 MB</small>
      </div>
    </div>
  );
};

export default ImageUploader;
