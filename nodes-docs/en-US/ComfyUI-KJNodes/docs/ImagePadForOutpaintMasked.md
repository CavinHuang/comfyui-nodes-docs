---
tags:
- Image
- ImagePadding
- ImageTransformation
---

# Pad Image For Outpaint Masked
## Documentation
- Class name: `ImagePadForOutpaintMasked`
- Category: `image`
- Output node: `False`

This node is designed to facilitate the outpainting process by padding images with a masked area, allowing for seamless integration of newly generated image parts with existing content. It employs various image processing techniques, including masking, blending, and filtering, to achieve a natural-looking extension of the image beyond its original boundaries.
## Input types
### Required
- **`image`**
    - The original image to be processed, serving as the base for the outpainting operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`left`**
    - The width of the padding to be added to the left side of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`top`**
    - The height of the padding to be added to the top of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`right`**
    - The width of the padding to be added to the right side of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`bottom`**
    - The height of the padding to be added to the bottom of the image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`feathering`**
    - The degree of feathering applied to the edges of the mask, blending the padded area with the original image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`mask`**
    - The mask indicating areas to be outpainted, guiding the application of padding and blending techniques.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The modified image with applied padding and masking for outpainting.
    - Python dtype: `torch.Tensor`
- **`mask`**
    - Comfy dtype: `MASK`
    - The updated mask reflecting the changes made during the outpainting process.
    - Python dtype: `torch.Tensor`
- **`ui`**
    - The node returns a modified image with applied padding and masking for outpainting, encapsulated within a UI component for visualization or further interaction.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImagePadForOutpaintMasked:

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "left": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "top": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "right": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "bottom": ("INT", {"default": 0, "min": 0, "max": MAX_RESOLUTION, "step": 8}),
                "feathering": ("INT", {"default": 40, "min": 0, "max": MAX_RESOLUTION, "step": 1}),
            },
            "optional": {
                "mask": ("MASK",),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK")
    FUNCTION = "expand_image"

    CATEGORY = "image"

    def expand_image(self, image, left, top, right, bottom, feathering, mask=None):
        B, H, W, C = image.size()

        new_image = torch.ones(
            (B, H + top + bottom, W + left + right, C),
            dtype=torch.float32,
        ) * 0.5

        new_image[:, top:top + H, left:left + W, :] = image

        if mask is None:
            new_mask = torch.ones(
                (H + top + bottom, W + left + right),
                dtype=torch.float32,
            )

            t = torch.zeros(
            (H, W),
            dtype=torch.float32
            )
        else:
            # If a mask is provided, pad it to fit the new image size
            mask = F.pad(mask, (left, right, top, bottom), mode='constant', value=0)
            mask = 1 - mask
            t = torch.zeros_like(mask)

        
        
        if feathering > 0 and feathering * 2 < H and feathering * 2 < W:

            for i in range(H):
                for j in range(W):
                    dt = i if top != 0 else H
                    db = H - i if bottom != 0 else H

                    dl = j if left != 0 else W
                    dr = W - j if right != 0 else W

                    d = min(dt, db, dl, dr)

                    if d >= feathering:
                        continue

                    v = (feathering - d) / feathering

                    if mask is None:
                        t[i, j] = v * v
                    else:
                        t[:, top + i, left + j] = v * v
        
        if mask is None:
            mask = new_mask.squeeze(0)
            mask[top:top + H, left:left + W] = t
            mask = mask.unsqueeze(0)

        return (new_image, mask,)

```
