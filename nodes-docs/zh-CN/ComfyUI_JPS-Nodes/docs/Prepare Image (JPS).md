
# Documentation
- Class name: Prepare Image (JPS)
- Category: JPS Nodes/Image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Prepare Image节点旨在根据指定的参数处理和调整图像，包括调整大小、裁剪、填充以及应用各种变换如插值和锐化等。该节点的目的是为进一步的处理或分析准备图像，确保它们符合所需的尺寸和质量标准。

# Input types
## Required
- image
    - 要处理的输入图像。这个参数至关重要，因为它作为所有后续调整和转换的基础。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- target_w
    - 处理后图像的目标宽度。它决定了图像将被调整或修改到的最终宽度。
    - Comfy dtype: INT
    - Python dtype: int
- target_h
    - 处理后图像的目标高度。它决定了图像将被调整或修改到的最终高度。
    - Comfy dtype: INT
    - Python dtype: int
- crop_w_percent
    - 裁剪后保留的图像宽度百分比。此参数允许精确控制裁剪区域的宽度。
    - Comfy dtype: INT
    - Python dtype: int
- crop_h_percent
    - 裁剪后保留的图像高度百分比。此参数允许精确控制裁剪区域的高度。
    - Comfy dtype: INT
    - Python dtype: int
- offset_w
    - 应用于图像的水平偏移量。这个参数可以用来在应用其他转换之前水平移动图像。
    - Comfy dtype: INT
    - Python dtype: int
- offset_h
    - 应用于图像的垂直偏移量。这个参数可以用来在应用其他转换之前垂直移动图像。
    - Comfy dtype: INT
    - Python dtype: int
- interpolation
    - 图像调整大小时使用的插值方法。这个参数影响调整大小后的图像质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- sharpening
    - 应用于图像的锐化级别。这个参数增强了图像的细节和清晰度。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - 应用指定调整和转换后处理得到的图像。
    - Comfy dtype: IMAGE
    - Python dtype: Image


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
