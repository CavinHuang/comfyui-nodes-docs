---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# Upscale Image
## Documentation
- Class name: `ImageScale`
- Category: `image/upscaling`
- Output node: `False`

The ImageScale node is designed for resizing images to specific dimensions, offering a selection of upscale methods and the ability to crop the resized image. It abstracts the complexity of image upscaling and cropping, providing a straightforward interface for modifying image dimensions according to user-defined parameters.
## Input types
### Required
- **`image`**
    - The input image to be upscaled. This parameter is central to the node's operation, serving as the primary data upon which resizing transformations are applied. The quality and dimensions of the output image are directly influenced by the original image's properties.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`upscale_method`**
    - Specifies the method used for upscaling the image. The choice of method can affect the quality and characteristics of the upscaled image, influencing the visual fidelity and potential artifacts in the resized output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`width`**
    - The target width for the upscaled image. This parameter directly influences the dimensions of the output image, determining the horizontal scale of the resizing operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height for the upscaled image. This parameter directly influences the dimensions of the output image, determining the vertical scale of the resizing operation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`crop`**
    - Determines whether and how the upscaled image should be cropped, offering options for disabled cropping or center cropping. This affects the final composition of the image by potentially removing edges to fit the specified dimensions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The upscaled (and optionally cropped) image, ready for further processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [FILM VFI](../../ComfyUI-Frame-Interpolation/Nodes/FILM VFI.md)
    - [LineArtPreprocessor](../../comfyui_controlnet_aux/Nodes/LineArtPreprocessor.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [VAEEncodeTiled](../../Comfy/Nodes/VAEEncodeTiled.md)
    - [StableZero123_Conditioning](../../Comfy/Nodes/StableZero123_Conditioning.md)
    - [OpenposePreprocessor](../../comfyui_controlnet_aux/Nodes/OpenposePreprocessor.md)
    - IPAdapterApply
    - [Image Rembg (Remove Background)](../../was-node-suite-comfyui/Nodes/Image Rembg (Remove Background).md)



## Source code
```python
class ImageScale:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos"]
    crop_methods = ["disabled", "center"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": { "image": ("IMAGE",), "upscale_method": (s.upscale_methods,),
                              "width": ("INT", {"default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                              "height": ("INT", {"default": 512, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                              "crop": (s.crop_methods,)}}
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"

    CATEGORY = "image/upscaling"

    def upscale(self, image, upscale_method, width, height, crop):
        if width == 0 and height == 0:
            s = image
        else:
            samples = image.movedim(-1,1)

            if width == 0:
                width = max(1, round(samples.shape[3] * height / samples.shape[2]))
            elif height == 0:
                height = max(1, round(samples.shape[2] * width / samples.shape[3]))

            s = comfy.utils.common_upscale(samples, width, height, upscale_method, crop)
            s = s.movedim(1,-1)
        return (s,)

```
