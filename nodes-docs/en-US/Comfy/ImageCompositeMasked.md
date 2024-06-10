---
tags:
- Image
- ImageBlend
- ImageComposite
---

# ImageCompositeMasked
## Documentation
- Class name: `ImageCompositeMasked`
- Category: `image`
- Output node: `False`

The ImageCompositeMasked node is designed for compositing images, allowing for the overlay of a source image onto a destination image at specified coordinates, with optional resizing and masking.
## Input types
### Required
- **`destination`**
    - The destination image onto which the source image will be composited. It serves as the background for the composite operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`source`**
    - The source image to be composited onto the destination image. This image can optionally be resized to fit the destination image's dimensions.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`x`**
    - The x-coordinate in the destination image where the top-left corner of the source image will be placed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y-coordinate in the destination image where the top-left corner of the source image will be placed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`resize_source`**
    - A boolean flag indicating whether the source image should be resized to match the destination image's dimensions.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`mask`**
    - An optional mask that specifies which parts of the source image should be composited onto the destination image. This allows for more complex compositing operations, such as blending or partial overlays.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the compositing operation, which combines elements of both the source and destination images according to the specified parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ImageInvert](../../Comfy/Nodes/ImageInvert.md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageCompositeMasked](../../Comfy/Nodes/ImageCompositeMasked.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)
    - [VAEEncode](../../Comfy/Nodes/VAEEncode.md)
    - [ColorCorrect](../../comfyui-art-venture/Nodes/ColorCorrect.md)



## Source code
```python
class ImageCompositeMasked:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "destination": ("IMAGE",),
                "source": ("IMAGE",),
                "x": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "y": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
                "resize_source": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "composite"

    CATEGORY = "image"

    def composite(self, destination, source, x, y, resize_source, mask = None):
        destination = destination.clone().movedim(-1, 1)
        output = composite(destination, source.movedim(-1, 1), x, y, mask, 1, resize_source).movedim(1, -1)
        return (output,)

```
