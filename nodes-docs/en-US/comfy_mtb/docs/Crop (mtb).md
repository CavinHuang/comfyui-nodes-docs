---
tags:
- Crop
- Image
- ImageTransformation
---

# Crop (mtb)
## Documentation
- Class name: `Crop (mtb)`
- Category: `mtb/crop`
- Output node: `False`

The Crop node in the MTB (Mask to Bounding Box) suite is designed to perform image cropping operations based on specified parameters such as bounding boxes or masks. It allows for precise extraction of image regions, supporting functionalities like border blending for seamless integration of cropped areas into new contexts.
## Input types
### Required
- **`image`**
    - The input image to be cropped. This is the primary data upon which the cropping operation is performed, determining the area of focus for the operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
### Optional
- **`mask`**
    - An optional mask that can be used to define the cropping area more precisely, allowing for more complex shapes beyond simple rectangular regions.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor or None`
- **`x`**
    - The x-coordinate of the top-left corner of the cropping area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`y`**
    - The y-coordinate of the top-left corner of the cropping area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - The width of the cropping area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the cropping area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bbox`**
    - An optional bounding box that specifies the cropping area. If provided, it overrides the x, y, width, and height parameters.
    - Comfy dtype: `BBOX`
    - Python dtype: `Tuple[int, int, int, int] or None`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the cropping operation.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The mask corresponding to the cropped area, if a mask was provided as input.
    - Python dtype: `torch.Tensor or None`
- **`bbox`**
    - Comfy dtype: `BBOX`
    - The coordinates and dimensions of the cropping area.
    - Python dtype: `Tuple[int, int, int, int]`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_Crop:
    """Crops an image and an optional mask to a given bounding box

    The bounding box can be given as a tuple of (x, y, width, height) or as a BBOX type
    The BBOX input takes precedence over the tuple input
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
            },
            "optional": {
                "mask": ("MASK",),
                "x": (
                    "INT",
                    {"default": 0, "max": 10000000, "min": 0, "step": 1},
                ),
                "y": (
                    "INT",
                    {"default": 0, "max": 10000000, "min": 0, "step": 1},
                ),
                "width": (
                    "INT",
                    {"default": 256, "max": 10000000, "min": 0, "step": 1},
                ),
                "height": (
                    "INT",
                    {"default": 256, "max": 10000000, "min": 0, "step": 1},
                ),
                "bbox": ("BBOX",),
            },
        }

    RETURN_TYPES = ("IMAGE", "MASK", "BBOX")
    FUNCTION = "do_crop"

    CATEGORY = "mtb/crop"

    def do_crop(
        self,
        image: torch.Tensor,
        mask=None,
        x=0,
        y=0,
        width=256,
        height=256,
        bbox=None,
    ):
        image = image.numpy()
        if mask is not None:
            mask = mask.numpy()

        if bbox is not None:
            x, y, width, height = bbox

        cropped_image = image[:, y : y + height, x : x + width, :]
        cropped_mask = None
        if mask is not None:
            cropped_mask = (
                mask[:, y : y + height, x : x + width]
                if mask is not None
                else None
            )
        crop_data = (x, y, width, height)

        return (
            torch.from_numpy(cropped_image),
            torch.from_numpy(cropped_mask)
            if cropped_mask is not None
            else None,
            crop_data,
        )

```
