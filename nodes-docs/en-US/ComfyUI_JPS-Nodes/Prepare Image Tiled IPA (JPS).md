---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# Prepare Image Tiled IPA (JPS)
## Documentation
- Class name: `Prepare Image Tiled IPA (JPS)`
- Category: `JPS Nodes/Image`
- Output node: `False`

The Prepare Image Tiled IPA node is designed to configure and apply image preparation settings for tiled image processing. It adjusts parameters such as model type, weight type, noise level, and image tiling options based on the input specifications, facilitating the tailored preprocessing of images for enhanced image synthesis or manipulation tasks.
## Input types
### Required
- **`image`**
    - Specifies the image to be processed, serving as the base for all subsequent image preparation operations.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`target_w`**
    - Sets the target width for the image processing, influencing the dimensions of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_h`**
    - Defines the target height for the image processing, influencing the dimensions of the output image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`zoom`**
    - Determines the zoom level applied to the image, affecting the scale of the image details.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_w`**
    - Specifies the horizontal offset for the image, adjusting its position along the width.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_h`**
    - Specifies the vertical offset for the image, adjusting its position along the height.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - Chooses the interpolation method for image resizing, affecting the smoothness and quality of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - Sets the level of sharpening to be applied to the image, enhancing edge definition and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`tile_short`**
    - Defines the base length of the shortest side of the tile, influencing the tiling pattern and size.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`prepare_type`**
    - Selects the preparation type for the image, determining the specific processing approach to be applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - Returns the processed image with applied tiling, interpolation, and sharpening settings, ready for further use or analysis.
    - Python dtype: `IMAGE`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Prepare_Image_Tiled_IPA:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "target_w": ("INT", { "default": 0 , "min": 0, "step": 8, "display": "number" }),
                "target_h": ("INT", { "default": 0 , "min": 0, "step": 8, "display": "number" }),                
                "zoom": ("INT", {"default": 1.0, "min": 1, "max": 500, "step": 1}),
                "offset_w": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "offset_h": ("INT", { "default": 0, "min": -4096, "max": 4096, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
                "tile_short": ("INT", {"default": 2.0, "min": 1, "max": 5, "step": 1}),
                "prepare_type": ("INT", {"default": 1, "min": 1, "max": 9, "step": 1}),                
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGE",)
    FUNCTION = "crop_targetsize"
    CATEGORY = "JPS Nodes/Image"

    def crop_targetsize(self, image, target_w, target_h, zoom, offset_w, offset_h, interpolation, sharpening,tile_short,prepare_type):
        _, input_h, input_w, _ = image.shape

        tilelength = tile_short * 224

        #Direct Source
        if prepare_type == 9:
            copyimage = image

        #Source_AR + Source_Res
        if prepare_type == 4:
            target_w = input_w
            target_h = input_h

        #Source_AR + Tile_Res
        if prepare_type == 5:
            target_w = input_w
            target_h = input_h
            prepare_type = 2

        #Tile_AR + Source_Res
        if prepare_type == 6:
            target_w = input_w
            target_h = input_h
            prepare_type = 3

        #Square_AR + Target_Res
        if prepare_type == 7:
            target_ar = target_w / target_h
            if target_ar >= 1:
                target_w = target_h
            else:
                target_h = target_w

        #Square_AR + Tile_Res
        if prepare_type == 8:
            target_w = tilelength
            target_h = tilelength

        #Target_AR + Tile_Res
        if prepare_type == 2:
            target_ar = target_w / target_h
            if target_ar >= 1:
                target_h = tilelength
                target_w = round(tilelength * target_ar)
            else:
                target_w = tilelength
                target_h = round(tilelength / target_ar)

        #Tile_AR + Target_Res
        if prepare_type == 3:
            target_ar = target_w / target_h
            if target_ar >= 1:
                target_h = tilelength
                if target_ar < 1.5:
                    target_w = tilelength
                elif target_ar < 2:
                    target_w = round(tilelength * 1.5)
                elif target_ar < 2.5:
                    target_w = round(tilelength * 2)
                elif target_ar < 3:
                    target_w = round(tilelength * 2.5)
                elif target_ar < 3.5:
                    target_w = round(tilelength * 3)
                else:
                    target_w = round(tilelength * target_ar)
            else:
                target_w = tilelength
                target_ar  = target_h / target_w
                if target_ar < 1.5:
                    target_h = tilelength
                elif target_ar < 2:
                    target_h = round(tilelength * 1.5)
                elif target_ar < 2.5:
                    target_h = round(tilelength * 2)
                elif target_ar < 3:
                    target_h = round(tilelength * 2.5)
                elif target_ar < 3.5:
                    target_h = round(tilelength * 3)
                else:
                    target_h = round(tilelength * target_ar)

        zoom = float(zoom / 100)

        resize_needed_w = target_w / input_w
        resize_needed_h = target_h / input_h

        if resize_needed_w >= resize_needed_h:
            min_zoom_factor = resize_needed_w
        else:
            min_zoom_factor = resize_needed_h

        if zoom <= min_zoom_factor:
            zoom_factor = min_zoom_factor
#        elif zoom > min_zoom_factor and min_zoom_factor >=1:
#            zoom_factor = zoom
#        elif zoom > min_zoom_factor and min_zoom_factor < 1:
#            zoom_factor = min_zoom_factor
        else:
            zoom_factor = zoom
            
        zoomed_w = round(input_w * zoom_factor)
        zoomed_h = round(input_h * zoom_factor)

        resized_image = image.permute([0,3,1,2])

        if interpolation == "lanczos":
            resized_image = comfy.utils.lanczos(resized_image, zoomed_w, zoomed_h)
        else:
            resized_image = F.interpolate(resized_image, size=(zoomed_h, zoomed_w), mode=interpolation)

        resized_image = resized_image.permute([0,2,3,1])
        
        x0 = round((zoomed_w - target_w) / 2)
        x1 = x0 + target_w
        y0 = round((zoomed_h - target_h) / 2)
        y1 = y0 + target_h

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

 #      print("x0: "+str(x0))
 #      print("x1: "+str(x1))
 #      print("y0: "+str(y0))
 #      print("y1: "+str(y1))

        if sharpening > 0:
            output_image = contrast_adaptive_sharpening(output_image, sharpening)

        output_image = output_image[:, y0:y1, x0:x1, :]

        if prepare_type == 9:
            output_image = copyimage

        return(output_image,)

```
