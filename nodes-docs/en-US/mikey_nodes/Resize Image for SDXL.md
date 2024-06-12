---
tags:
- Crop
- Image
- ImageTransformation
---

# Resize Image for SDXL (Mikey)
## Documentation
- Class name: `Resize Image for SDXL`
- Category: `Mikey/Image`
- Output node: `False`

The ResizeImageSDXL node is designed for resizing images specifically for the SDXL model, offering options for different upscale methods and cropping techniques to adjust the image dimensions as needed.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the image to be resized. It plays a crucial role in determining the final output by serving as the base for resizing operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`upscale_method`**
    - The 'upscale_method' parameter allows the selection of a method for upscaling the image, affecting the quality and characteristics of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`crop`**
    - The 'crop' parameter specifies the cropping technique to be applied before or after resizing, influencing the portion of the image that is retained or discarded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is a resized image, adjusted according to the specified upscale method and cropping technique.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageScale](../../Comfy/Nodes/ImageScale.md)



## Source code
```python
class ResizeImageSDXL:
    crop_methods = ["disabled", "center"]
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",), "upscale_method": (s.upscale_methods,),
                              "crop": (s.crop_methods,)}}

    RETURN_TYPES = ('IMAGE',)
    FUNCTION = 'resize'
    CATEGORY = 'Mikey/Image'

    def upscale(self, image, upscale_method, width, height, crop):
        samples = image.movedim(-1,1)
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
        s = s.movedim(1,-1)
        return (s,)

    def resize(self, image, upscale_method, crop):
        w, h = find_latent_size(image.shape[2], image.shape[1])
        #print('Resizing image from {}x{} to {}x{}'.format(image.shape[2], image.shape[1], w, h))
        img = self.upscale(image, upscale_method, w, h, crop)[0]
        return (img, )

```
