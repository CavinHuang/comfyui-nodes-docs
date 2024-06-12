---
tags:
- Crop
- Image
- ImageTransformation
---

# Batch Resize Image for SDXL (Mikey)
## Documentation
- Class name: `Batch Resize Image for SDXL`
- Category: `Mikey/Image`
- Output node: `False`

This node is designed for batch processing of images, specifically resizing them according to specified upscale and crop methods. It allows for the efficient handling of multiple images within a directory, applying the same resizing parameters to each image.
## Input types
### Required
- **`image_directory`**
    - Specifies the directory containing the images to be processed. This parameter is crucial for locating and iterating over the images to apply the resizing operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`upscale_method`**
    - Determines the method used for upscaling the images during the resizing process. The choice of method can affect the quality and characteristics of the resized images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - Defines the cropping method to be applied to the images before resizing. This parameter allows for the adjustment of image dimensions and focus prior to upscaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a list of images that have been resized according to the specified upscale and crop methods.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class BatchResizeImageSDXL(ResizeImageSDXL):
    crop_methods = ["disabled", "center"]
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"image_directory": ("STRING", {"multiline": False, "placeholder": "Image Directory"}),
                             "upscale_method": (s.upscale_methods,),
                             "crop": (s.crop_methods,)},}

    RETURN_TYPES = ('IMAGE',)
    RETURN_NAMES = ('image',)
    FUNCTION = 'batch'
    CATEGORY = 'Mikey/Image'
    OUTPUT_IS_LIST = (True, )

    def batch(self, image_directory, upscale_method, crop):
        if not os.path.exists(image_directory):
            raise Exception(f"Image directory {image_directory} does not exist")

        images = []
        for file in os.listdir(image_directory):
            if file.endswith('.png') or file.endswith('.jpg') or file.endswith('.jpeg') or file.endswith('.webp') or file.endswith('.bmp') or file.endswith('.gif'):
                img = Image.open(os.path.join(image_directory, file))
                img = pil2tensor(img)
                # resize image
                img = self.resize(img, upscale_method, crop)[0]
                images.append(img)
        return (images,)

```
