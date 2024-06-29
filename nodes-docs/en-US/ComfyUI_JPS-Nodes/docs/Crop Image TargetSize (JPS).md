---
tags:
- Crop
- Image
- ImageTransformation
---

# Crop Image TargetSize (JPS)
## Documentation
- Class name: `Crop Image TargetSize (JPS)`
- Category: `JPS Nodes/Image`
- Output node: `False`

The Crop Image TargetSize node is designed for adjusting images to specific target dimensions with options for cropping, zooming, and applying various interpolation and sharpening techniques. It provides flexibility in image processing by allowing for precise control over the dimensions and quality of the output image, catering to different requirements for image manipulation.
## Input types
### Required
- **`image`**
    - The input image to be processed. It serves as the base for cropping, resizing, and applying other transformations to meet the target dimensions and quality specifications.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`target_w`**
    - The target width for the output image. This parameter dictates the desired width that the image should be adjusted to, either by cropping or resizing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_h`**
    - The target height for the output image. Similar to target_w, it specifies the desired height for the image adjustment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_position`**
    - Specifies the position from which the image should be cropped. This affects how the image is aligned before cropping to the target dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`offset`**
    - A general offset value used when adjusting the image's position before cropping. It allows for fine-tuning the crop alignment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - The method used for resizing the image. Different interpolation techniques can affect the image's quality and appearance.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - Determines whether and how much the output image should be sharpened, enhancing its details and overall clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed image after applying the specified cropping, zooming, interpolation, and sharpening transformations. It represents the final output that meets the target dimensions and quality criteria.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class Crop_Image_TargetSize:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "target_w": ("INT", { "default": 0 , "min": 0, "step": 8, "display": "number" }),
                "target_h": ("INT", { "default": 0 , "min": 0, "step": 8, "display": "number" }),                
                "crop_position": (["center","top", "bottom", "left", "right"],),
                "offset": ("INT", { "default": 0, "min": -2048, "max": 2048, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGE",)
    FUNCTION = "crop_targetsize"
    CATEGORY = "JPS Nodes/Image"

    def crop_targetsize(self, image, target_w, target_h, crop_position, offset, interpolation, sharpening):
        _, current_h, current_w, _ = image.shape

        current_ar = current_w / current_h

        if target_w / current_ar >= target_h:
            new_w = target_w
            new_h = round(new_w / current_ar)
            offset_h = offset
            offset_w = 0
        else:
            new_h = target_h
            new_w = round(new_h * current_ar)
            offset_w = offset
            offset_h = 0

  #      print("New Size")
  #      print(new_w)
  #      print(new_h)

        resized_image = image.permute([0,3,1,2])

        if interpolation == "lanczos":
            resized_image = comfy.utils.lanczos(resized_image, new_w, new_h)
        else:
            resized_image = F.interpolate(resized_image, size=(new_h, new_w), mode=interpolation)

        resized_image = resized_image.permute([0,2,3,1])

        output_image = resized_image

        if (crop_position == "left"):
            newoffset_w = offset_w
        elif (crop_position == "right"):
            newoffset_w = new_w - target_w + offset_w
        else:
            newoffset_w = (new_w - target_w) // 2 + offset_w

        if (crop_position == "top"):
            newoffset_h = offset_h
        elif (crop_position == "bottom"):
            newoffset_h = new_h - target_h + offset_h
        else:
            newoffset_h = (new_h - target_h) // 2 + offset_h

        if newoffset_w < 0:
            newoffset_w = 0
        elif newoffset_w + target_w > new_w:
            newoffset_w = new_w - target_w

        if newoffset_h < 0:
            newoffset_h = 0
        elif newoffset_h + target_h > new_h:
            newoffset_h = new_h - target_h
        
        x = newoffset_w
        x2 = newoffset_w+target_w
        y = newoffset_h
        y2 = newoffset_h+target_h

 #       print("x: "+str(x))
 #       print("x2: "+str(x2))
 #       print("y: "+str(y))
 #       print("y2: "+str(y2))

        if sharpening > 0:
            output_image = contrast_adaptive_sharpening(output_image, sharpening)

        output_image = output_image[:, y:y2, x:x2, :]

        return(output_image, )

```
