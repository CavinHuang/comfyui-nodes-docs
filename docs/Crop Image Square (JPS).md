
# Documentation
- Class name: Crop Image Square (JPS)
- Category: JPS Nodes/Image
- Output node: False

Crop Image Square (JPS)节点旨在根据指定的参数将图像裁剪成正方形。这些参数包括裁剪位置、偏移量、缩放级别、插值方法、目标分辨率和锐化强度。它允许对裁剪过程进行精确控制，以获得所需的图像正方形裁剪效果。

# Input types
## Required
- image
    - 需要裁剪成正方形的图像。这个参数至关重要，因为它定义了将要进行裁剪处理的源图像。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- crop_position
    - 指定裁剪的起始位置，允许根据图像的构图进行有针对性的裁剪。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- offset_x
    - 从指定裁剪位置开始的水平偏移量，用于在x轴上微调裁剪的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- offset_y
    - 从指定裁剪位置开始的垂直偏移量，用于在y轴上微调裁剪的起始点。
    - Comfy dtype: INT
    - Python dtype: int
- zoom
    - 决定裁剪前应用于图像的缩放级别，允许更集中地关注图像的特定区域。
    - Comfy dtype: FLOAT
    - Python dtype: float
- interpolation
    - 在裁剪过程中用于调整图像大小的方法，影响裁剪后图像的质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- target_rez
    - 裁剪图像的目标分辨率，指定输出正方形图像的所需尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- sharpening
    - 应用于裁剪图像的锐化强度，用于增强图像的细节和边缘。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- IMAGE
    - Comfy dtype: IMAGE
    - 裁剪过程后的结果图像，已经调整为指定的正方形形状、分辨率，并进行了质量增强。
    - Python dtype: PIL.Image.Image


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Crop_Image_Square:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "crop_position": (["center", "top", "bottom", "left", "right"],),
                "offset_x": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "offset_y": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "zoom": ("FLOAT", { "default": 1, "min": 1, "max": 5, "step": 0.1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "target_rez": ("INT", { "default": 0 , "min": 0, "step": 8, "display": "number" }),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGE",)
    FUNCTION = "crop_square"
    CATEGORY = "JPS Nodes/Image"

    def crop_square(self, image, crop_position, offset_x, offset_y, zoom, interpolation, target_rez,sharpening):
        _, h, w, _ = image.shape
        crop_size = min(h, w)

        offset_x = int (offset_x * zoom)
        offset_y = int (offset_y * zoom)

        if "center" in crop_position:
            x = round((w*zoom-crop_size) / 2)
            y = round((h*zoom-crop_size) / 2)
        if "top" in crop_position:
            x = round((w*zoom-crop_size) / 2)
            y = 0
        if "bottom" in crop_position:
            x = round((w*zoom-crop_size) / 2)
            y = h*zoom-crop_size
        if "left" in crop_position:
            x = 0
            y = round((h*zoom-crop_size) / 2)
        if "right" in crop_position:
            x = w*zoom-crop_size
            y = round((h*zoom-crop_size) / 2)

        x = int(x)
        y = int(y)

        if (x + offset_x >= 0 and x + crop_size + offset_x <= int(w*zoom)):
            x = x + offset_x
        elif (x + offset_x >= 0):
            x = int(w*zoom) - crop_size
        elif (x + crop_size + offset_x <= int(w*zoom)):
            x = 0

        if (y + offset_y >= 0 and y + crop_size + offset_y <= int(h*zoom)):
            y = y + offset_y
        elif (y + offset_y >= 0):
            y = int(h*zoom) - crop_size
        elif (y + crop_size + offset_y <= int(h*zoom)):
            y = 0

        x2 = x+crop_size
        y2 = y+crop_size

        zoomedimage = image[:, 0:h, 0:w, :]

        zoomedimage = zoomedimage.permute([0,3,1,2])        

        zoomedimage = comfy.utils.lanczos(zoomedimage, int(w*zoom), int(h*zoom))

        zoomedimage = zoomedimage.permute([0,2,3,1])

        output = zoomedimage[:, y:y2, x:x2, :]

        output = output.permute([0,3,1,2])

        if target_rez != 0:
            if interpolation == "lanczos":
                output = comfy.utils.lanczos(output, target_rez, target_rez)
            else:
                output = F.interpolate(output, size=(target_rez, target_rez), mode=interpolation)

        if sharpening > 0:
            output = contrast_adaptive_sharpening(output, sharpening)
    
        output = output.permute([0,2,3,1])

        return(output, )

```
