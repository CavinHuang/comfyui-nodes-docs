---
tags:
- ImageResize
- ImageScaling
- ImageSize
- ImageTransformation
---

# Image Resize
## Documentation
- Class name: `JWImageResize`
- Category: `jamesWalker55`
- Output node: `False`

The JWImageResize node is designed to adjust the size of an image to specified width and height dimensions, using a chosen interpolation method to maintain image quality.
## Input types
### Required
- **`image`**
    - The input image tensor to be resized. It's crucial for defining the visual content that will undergo resizing.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`height`**
    - Specifies the target height for the resized image, directly influencing the image's vertical dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Determines the target width for the resized image, directly affecting the image's horizontal dimension.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`interpolation_mode`**
    - The method used for interpolating between pixel values when resizing, which affects the quality and appearance of the output image.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resized image tensor, adjusted to the specified dimensions and interpolation quality.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [GroundingDinoSAMSegment (segment anything)](../../comfyui_segment_anything/Nodes/GroundingDinoSAMSegment (segment anything).md)
    - [IPAdapterEncoder](../../ComfyUI_IPAdapter_plus/Nodes/IPAdapterEncoder.md)
    - [CLIPVisionEncode](../../Comfy/Nodes/CLIPVisionEncode.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - Reroute



## Source code
```python
@register_node("JWImageLoadRGB", "Image Load RGB")
class _:
    CATEGORY = "jamesWalker55"
    INPUT_TYPES = lambda: {
        "required": {
            "path": ("STRING", {"default": "./image.png"}),
        }
    }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "execute"

    def execute(self, path: str):
        assert isinstance(path, str)

        img = load_image(path)
        return (img,)

```
