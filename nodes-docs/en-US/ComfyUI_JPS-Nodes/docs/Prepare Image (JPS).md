---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# Prepare Image (JPS)
## Documentation
- Class name: `Prepare Image (JPS)`
- Category: `JPS Nodes/Image`
- Output node: `False`

The Prepare Image node is designed to process and adjust images according to specified parameters such as resizing, cropping, padding, and applying various transformations like interpolation and sharpening. This node aims to prepare images for further processing or analysis, ensuring they meet the required dimensions and quality standards.
## Input types
### Required
- **`image`**
    - The input image to be processed. This parameter is crucial as it serves as the base for all subsequent adjustments and transformations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`target_w`**
    - The target width for the image after processing. It determines the final width that the image will be resized or adjusted to.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_h`**
    - The target height for the image after processing. It determines the final height that the image will be resized or adjusted to.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_w_percent`**
    - The percentage of the image's width to be retained after cropping. This parameter allows for precise control over the width of the cropped area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_h_percent`**
    - The percentage of the image's height to be retained after cropping. This parameter allows for precise control over the height of the cropped area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_w`**
    - The horizontal offset applied to the image. This parameter can be used to shift the image horizontally before other transformations are applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_h`**
    - The vertical offset applied to the image. This parameter can be used to shift the image vertically before other transformations are applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - The interpolation method to be used during image resizing. This parameter affects the quality of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - The level of sharpening to apply to the image. This parameter enhances the image's details and clarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The processed image after applying the specified adjustments and transformations.
    - Python dtype: `Image`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Prepare_Image:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "target_w": ("INT", { "default": 1024 , "min": 0, "step": 8, "display": "number" }),
                "target_h": ("INT", { "default": 1024 , "min": 0, "step": 8, "display": "number" }),
                "crop_w_percent": ("INT", { "default": 100 , "min": 10, "max": 100, "step": 1, "display": "number" }),
                "crop_h_percent": ("INT", { "default": 100 , "min": 10, "max": 100, "step": 1, "display": "number" }),
                "offset_w": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "offset_h": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGE",)
    FUNCTION = "prepare_image"
    CATEGORY = "JPS Nodes/Image"

    def prepare_image(self, image, target_w, target_h, crop_w_percent, crop_h_percent, offset_w, offset_h, interpolation, sharpening, padding_left, padding_right, padding_top, padding_bottom):
        _, input_h, input_w, _ = image.shape
   
        resize_needed_w = target_w / input_w / crop_w_percent * 100
        resize_needed_h = target_h / input_h / crop_h_percent * 100

        if resize_needed_w >= resize_needed_h:
            min_zoom_factor = resize_needed_w
        else:
            min_zoom_factor = resize_needed_h

        zoom_factor = min_zoom_factor

        zoomed_w = round(input_w * zoom_factor)
        zoomed_h = round(input_h * zoom_factor)

        resized_image = image.permute([0,3,1,2])

        if interpolation == "lanczos":
            resized_image = comfy.utils.lanczos(resized_image, zoomed_w, zoomed_h)
        else:
            resized_image = F.interpolate(resized_image, size=(zoomed_h, zoomed_w), mode=interpolation)

        resized_image = resized_image.permute([0,2,3,1])
        
        x0 = round((zoomed_w - target_w) / 2)
        x1 = round(x0 + target_w)
        y0 = round((zoomed_h - target_h) / 2)
        y1 = round(y0 + target_h)

        if x0 + offset_w + target_w < zoomed_w and offset_w > 0:
            x0 = x0 + offset_w
            x1 = x0 + target_w
        elif x0 + offset_w + target_w >= zoomed_w and offset_w > 0:
            x0 = zoomed_w - target_w 
            x1 = zoomed_w
        elif x0 + offset_w > 0 and offset_w < 0:
                x0 = x0 + offset_w
                x1 = x0 + target_w
        elif x0 + offset_w <= 0 and offset_w < 0:
                x0 = 0
                x1 = target_w

        if y0 + offset_h + target_h < zoomed_h and offset_h > 0:
            y0 = y0 + offset_h
            y1 = y0 + target_h
        elif y0 + offset_h + target_h >= zoomed_h and offset_h > 0:
            y0 = zoomed_h - target_h 
            y1 = zoomed_h
        elif y0 + offset_h > 0 and offset_h < 0:
                y0 = y0 + offset_h
                y1 = y0 + target_h
        elif y0 + offset_h <= 0 and offset_h < 0:
                y0 = 0
                y1 = target_h

        output_image = resized_image

        if sharpening > 0:
            output_image = contrast_adaptive_sharpening(output_image, sharpening)

        output_image = output_image[:, y0:y1, x0:x1, :]

        return(output_image,)

```
