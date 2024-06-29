---
tags:
- Image
- ImagePreprocessing
- ImageTransformation
---

# Prepare Image Plus (JPS)
## Documentation
- Class name: `Prepare Image Plus (JPS)`
- Category: `JPS Nodes/Image`
- Output node: `False`

The Prepare Image Plus node is designed to configure and apply a set of image preparation settings, including resizing, cropping, padding, interpolation, sharpening, and flipping. It allows for detailed customization of how an image is processed before being used in further operations, ensuring that images are optimally prepared for tasks such as machine learning model input or visual presentation.
## Input types
### Required
- **`image`**
    - The primary image input for processing. This parameter is essential as it specifies the image to which all preparation settings will be applied.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`target_w`**
    - Specifies the target width for the image after resizing, affecting the final dimensions of the processed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`target_h`**
    - Specifies the target height for the image after resizing, impacting the final dimensions of the processed image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_w`**
    - Determines the horizontal offset applied to the image, which can adjust the image's position or alignment.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`offset_h`**
    - Determines the vertical offset applied to the image, impacting the image's position or alignment vertically.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_left`**
    - Specifies the amount of cropping from the left side of the image, useful for removing unwanted edges or framing the subject.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_right`**
    - Specifies the amount of cropping from the right side of the image, aiding in framing the subject or removing extraneous parts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_top`**
    - Determines the amount of cropping from the top of the image, which can help in adjusting the framing or focusing on specific parts of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop_bottom`**
    - Determines the amount of cropping from the bottom of the image, useful for framing or removing unnecessary parts.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_left`**
    - Specifies the amount of padding added to the left side of the image, which can be used for alignment or aesthetic purposes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_right`**
    - Specifies the amount of padding added to the right side of the image, aiding in alignment or visual design.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_top`**
    - Determines the amount of padding added to the top of the image, which can be used for alignment or to achieve a specific visual effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`padding_bottom`**
    - Determines the amount of padding added to the bottom of the image, useful for alignment or achieving a desired visual layout.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation`**
    - Defines the method used for resizing the image, impacting the quality and appearance of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`sharpening`**
    - Specifies the level of sharpening applied to the image, enhancing edge definition and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`resize_type`**
    - Determines the method of resizing applied to the image, such as stretching or cropping to fit the specified dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`flip`**
    - Indicates whether the image should be flipped horizontally, vertically, or not at all, affecting the image's orientation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output is the image after applying the specified preparation settings, including resizing, cropping, padding, interpolation, sharpening, and flipping.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Prepare_Image_Plus:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "target_w": ("INT", { "default": 1024 , "min": 0, "step": 8, "display": "number" }),
                "target_h": ("INT", { "default": 1024 , "min": 0, "step": 8, "display": "number" }),
                "offset_w": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "offset_h": ("INT", { "default": 0, "min": -99, "max": 99, "step": 1, "display": "number" }),
                "crop_left": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_right": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_top": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "crop_bottom": ("INT", { "default": 0, "min": 0, "max": 90, "step": 1, "display": "number" }),
                "padding_left": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_right": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_top": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "padding_bottom": ("INT", { "default": 0, "min": 0, "max": 500, "step": 1, "display": "number" }),
                "interpolation": (["lanczos", "nearest", "bilinear", "bicubic", "area", "nearest-exact"],),
                "sharpening": ("FLOAT", {"default": 0.0, "min": 0, "max": 1, "step": 0.05}),
                "resize_type": (["Crop", "Stretch"],),
                "flip": (["No", "X-Axis", "Y-Axis"],),
            }
        }
    
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("IMAGE",)
    FUNCTION = "prepare_image"
    CATEGORY = "JPS Nodes/Image"

    def prepare_image(self, image, target_w, target_h, offset_w, offset_h, crop_left, crop_right, crop_top, crop_bottom, padding_left, padding_right, padding_top, padding_bottom,interpolation, sharpening,resize_type,flip):
        _, input_h, input_w, _ = image.shape

        dim = ()
        if flip == "X-Axis":
            dim += (2,)
            image = torch.flip(image, dim)            
        if flip == "Y-Axis":
            dim += (2,)
            image = torch.flip(image, dim)

        if crop_left + crop_right > 90:
            crop_left = 90 / (crop_left + crop_right) * crop_left
            crop_right = 90 / (crop_left + crop_right) * crop_right
        
        if crop_top + crop_bottom > 90:
            crop_top = 90 / (crop_top + crop_bottom) * crop_top
            crop_bottom = 90 / (crop_top + crop_bottom) * crop_bottom

        left = int(input_w-(input_w * (100-crop_left) / 100))
        right = int(input_w-(input_w * (100-crop_right) / 100))
        top = int(input_h-(input_h * (100-crop_top) / 100))
        bottom = int(input_h-(input_h * (100-crop_bottom) / 100))
        
        image = image[:, 0+top:input_h-bottom, 0+left:input_w-right, :]
  
        input_h = input_h - top - bottom
        input_w = input_w - left - right
  
        left = int(((input_w * (100+padding_left) / 100) - input_w))
        right = int(((input_w * (100+padding_right) / 100) - input_w))
        top = int(((input_h * (100+padding_top) / 100) - input_h))
        bottom = int(((input_h * (100+padding_bottom) / 100) - input_h))

        pil_image = Image.fromarray(np.clip(255. * image.cpu().numpy().squeeze(), 0, 255).astype(np.uint8))
        padded_image = Image.new("RGB", (pil_image.width + left + right, pil_image.height + top + bottom), color="black")
        padded_image.paste(pil_image, (left, top))
        image = torch.from_numpy(np.array(padded_image).astype(np.float32) / 255.0).unsqueeze(0)

        input_h = input_h + top + bottom
        input_w = input_w + left + right

        if resize_type != "Stretch":

            resize_needed_w = target_w / input_w 
            resize_needed_h = target_h / input_h 

            if resize_needed_w >= resize_needed_h:
                min_zoom_factor = resize_needed_w
            else:
                min_zoom_factor = resize_needed_h

            zoom_factor = min_zoom_factor

            zoomed_w = round(input_w * zoom_factor)
            zoomed_h = round(input_h * zoom_factor)

            offset_w = int(zoomed_w / 100 * offset_w / 2)
            offset_h = int(zoomed_h / 100 * offset_h / 2)

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

            output_image = output_image[:, y0:y1, x0:x1, :]

        else:

            resized_image = image.permute([0,3,1,2])

            if interpolation == "lanczos":
                resized_image = comfy.utils.lanczos(resized_image, target_w, target_h)
            else:
                resized_image = F.interpolate(resized_image, size=(target_h, target_w), mode=interpolation)

            resized_image = resized_image.permute([0,2,3,1])
            output_image = resized_image

        if sharpening > 0:
            output_image = contrast_adaptive_sharpening(output_image, sharpening)

        return(output_image,)

```
