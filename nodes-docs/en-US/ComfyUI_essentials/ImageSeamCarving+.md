---
tags:
- Image
---

# 🔧 Image Seam Carving
## Documentation
- Class name: `ImageSeamCarving+`
- Category: `essentials`
- Output node: `False`

The ImageSeamCarving node is designed for dynamically resizing images while preserving their essential content features. It employs seam carving techniques to selectively remove or add pixels in paths (seams) across the image, taking into consideration content importance indicated by energy maps, and optionally, keep and drop masks to protect or remove specific areas.
## Input types
### Required
- **`image`**
    - The input image to be processed for seam carving. It serves as the primary data on which the seam carving algorithm operates, dynamically resizing the image while preserving or discarding content as specified by other parameters.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`width`**
    - The target width for the resized image. This parameter dictates the new width dimension the image should be resized to, influencing the number of seams to be carved or added.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The target height for the resized image. Similar to width, this parameter sets the new height dimension for the image, affecting the seam carving process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`energy`**
    - Specifies the energy calculation mode to determine the importance of pixels in the image. This mode influences which pixels are prioritized for removal or retention during the resizing process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`order`**
    - Determines the order in which seams are processed (e.g., width-first or height-first), affecting the direction and strategy of the seam carving operation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`keep_mask`**
    - An optional mask to indicate areas of the image that should be preserved during the seam carving process. It helps in protecting specific content from being altered or removed.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`drop_mask`**
    - An optional mask to specify areas of the image that can be preferentially removed during the resizing process. It is used to target less important areas for seam removal.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after seam carving. It is the resized version of the input image, adjusted according to the specified parameters and preserving or discarding content as directed.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ImageSeamCarving:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "width": ("INT", { "default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1, }),
                "height": ("INT", { "default": 512, "min": 1, "max": MAX_RESOLUTION, "step": 1, }),
                "energy": (["backward", "forward"],),
                "order": (["width-first", "height-first"],),
            },
            "optional": {
                "keep_mask": ("MASK",),
                "drop_mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "essentials"
    FUNCTION = "execute"

    def execute(self, image, width, height, energy, order, keep_mask=None, drop_mask=None):
        try:
            from .carve import seam_carving
        except ImportError as e:
            raise Exception(e)

        img = p(image)

        if keep_mask is not None:
            #keep_mask = keep_mask.reshape((-1, 1, keep_mask.shape[-2], keep_mask.shape[-1])).movedim(1, -1)
            keep_mask = p(keep_mask.unsqueeze(-1))

            if keep_mask.shape[2] != img.shape[2] or keep_mask.shape[3] != img.shape[3]:
                keep_mask = F.interpolate(keep_mask, size=(img.shape[2], img.shape[3]), mode="bilinear")
        if drop_mask is not None:
            drop_mask = p(drop_mask.unsqueeze(-1))

            if drop_mask.shape[2] != img.shape[2] or drop_mask.shape[3] != img.shape[3]:
                drop_mask = F.interpolate(drop_mask, size=(img.shape[2], img.shape[3]), mode="bilinear")

        out = []
        for i in range(img.shape[0]):
            resized = seam_carving(
                T.ToPILImage()(img[i]),
                size=(width, height),
                energy_mode=energy,
                order=order,
                keep_mask=T.ToPILImage()(keep_mask[i]) if keep_mask is not None else None,
                drop_mask=T.ToPILImage()(drop_mask[i]) if drop_mask is not None else None,
            )
            out.append(T.ToTensor()(resized))

        out = torch.stack(out)
        out = pb(out)

        return(out, )

```
