---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# Image Resize
## Documentation
- Class name: `Image Resize`
- Category: `WAS Suite/Image/Transform`
- Output node: `False`

The Image Resize node is designed to modify the dimensions of an input image according to specified parameters. It supports various resizing modes, including scaling, rescaling, and cropping, to accommodate different image processing needs. This node can also apply supersampling for higher quality resizing and adjust the image size to meet specific width and height requirements, making it versatile for a range of image manipulation tasks.
## Input types
### Required
- **`image`**
    - The input image to be resized. This image undergoes transformations based on the specified mode and parameters, affecting the final output dimensions and quality.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image.Image`
- **`mode`**
    - Specifies the resizing mode, such as 'scale', 'rescale', or a cropping method. This determines how the image dimensions are adjusted.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`supersample`**
    - Indicates whether supersampling should be applied to the image for higher quality resizing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`resampling`**
    - The resampling filter used during resizing, such as 'bicubic' or 'lanczos', affecting the quality of the resized image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`rescale_factor`**
    - The scaling factor used when the mode is set to 'rescale', determining how much the image dimensions are increased or decreased.
    - Comfy dtype: `FLOAT`
    - Python dtype: `int`
- **`resize_width`**
    - The target width of the image after resizing. It ensures the final width is a multiple of 8 for optimal processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resize_height`**
    - The target height of the image after resizing. It ensures the final height is a multiple of 8 for optimal processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized version of the input image, adjusted according to the specified parameters and mode.
    - Python dtype: `Image.Image`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [GroundingDinoSAMSegment (segment anything)](../../comfyui_segment_anything/Nodes/GroundingDinoSAMSegment (segment anything).md)
    - [IPAdapterEncoder](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapterEncoder.md)
    - [CLIPVisionEncode](../../Comfy/Nodes/CLIPVisionEncode.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - Reroute



## Source code
```python
class WAS_Image_Rescale:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mode": (["rescale", "resize"],),
                "supersample": (["true", "false"],),
                "resampling": (["lanczos", "nearest", "bilinear", "bicubic"],),
                "rescale_factor": ("FLOAT", {"default": 2, "min": 0.01, "max": 16.0, "step": 0.01}),
                "resize_width": ("INT", {"default": 1024, "min": 1, "max": 48000, "step": 1}),
                "resize_height": ("INT", {"default": 1536, "min": 1, "max": 48000, "step": 1}),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "image_rescale"

    CATEGORY = "WAS Suite/Image/Transform"

    def image_rescale(self, image, mode="rescale", supersample='true', resampling="lanczos", rescale_factor=2, resize_width=1024, resize_height=1024):
        scaled_images = []
        for img in image:
            scaled_images.append(pil2tensor(self.apply_resize_image(tensor2pil(img), mode, supersample, rescale_factor, resize_width, resize_height, resampling)))
        scaled_images = torch.cat(scaled_images, dim=0)

        return (scaled_images, )

    def apply_resize_image(self, image: Image.Image, mode='scale', supersample='true', factor: int = 2, width: int = 1024, height: int = 1024, resample='bicubic'):

        # Get the current width and height of the image
        current_width, current_height = image.size

        # Calculate the new width and height based on the given mode and parameters
        if mode == 'rescale':
            new_width, new_height = int(
                current_width * factor), int(current_height * factor)
        else:
            new_width = width if width % 8 == 0 else width + (8 - width % 8)
            new_height = height if height % 8 == 0 else height + \
                (8 - height % 8)

        # Define a dictionary of resampling filters
        resample_filters = {
            'nearest': 0,
            'bilinear': 2,
            'bicubic': 3,
            'lanczos': 1
        }

        # Apply supersample
        if supersample == 'true':
            image = image.resize((new_width * 8, new_height * 8), resample=Image.Resampling(resample_filters[resample]))

        # Resize the image using the given resampling filter
        resized_image = image.resize((new_width, new_height), resample=Image.Resampling(resample_filters[resample]))

        return resized_image

```
