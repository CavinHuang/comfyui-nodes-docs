---
tags:
- Crop
- Image
- ImageTransformation
---

# Crop Image Square (JPS)
## Documentation
- Class name: `Crop Image Square (JPS)`
- Category: `JPS Nodes/Image`
- Output node: `False`

This node is designed to crop an image into a square shape based on specified parameters such as crop position, offsets, zoom level, interpolation method, target resolution, and sharpening intensity. It allows for precise control over the cropping process to achieve the desired square crop of an image.
## Input types
### Required
- **`image`**
    - The image to be cropped into a square shape. This parameter is crucial as it defines the source image that will undergo the cropping process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `PIL.Image.Image`
- **`crop_position`**
    - Specifies the position from which the crop should start, allowing for targeted cropping based on the image's composition.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`offset_x`**
    - The horizontal offset from the specified crop position, enabling fine-tuning of the crop's starting point on the x-axis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_y`**
    - The vertical offset from the specified crop position, enabling fine-tuning of the crop's starting point on the y-axis.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`zoom`**
    - Determines the zoom level applied to the image before cropping, allowing for closer focus on specific areas of the image.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`interpolation`**
    - The method used for resizing the image during the cropping process, affecting the quality of the cropped image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`target_rez`**
    - The target resolution for the cropped image, specifying the desired dimensions of the output square image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`sharpening`**
    - The intensity of sharpening applied to the cropped image, enhancing its details and edges.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the cropping process, which has been adjusted to meet the specified square shape, resolution, and quality enhancements.
    - Python dtype: `PIL.Image.Image`
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
