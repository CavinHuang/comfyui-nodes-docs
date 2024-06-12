---
tags:
- Image
- ImageTransformation
---

# Image Premultiply (mtb)
## Documentation
- Class name: `Image Premultiply (mtb)`
- Category: `mtb/image`
- Output node: `False`

The MTB_ImagePremultiply node is designed to premultiply an image with a mask, optionally inverting the mask. This operation is commonly used in image processing to combine an image with a transparency mask, affecting the image's transparency according to the mask's values.
## Input types
### Required
- **`image`**
    - The 'image' parameter represents the image to be premultiplied with the mask. It plays a crucial role in the node's operation by serving as the primary visual content to be processed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The 'mask' parameter is used to define the transparency mask that will be applied to the image. Its values determine the transparency of the corresponding areas in the image, significantly influencing the output.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`invert`**
    - The 'invert' parameter allows for the inversion of the mask's values before applying it to the image. This inversion can alter the visual outcome by changing which parts of the image are transparent.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`RGBA`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has been premultiplied with the mask, reflecting the combined visual effect of the image and mask transparency.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_ImagePremultiply:
    """Premultiply image with mask"""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "invert": ("BOOLEAN", {"default": False}),
            }
        }

    CATEGORY = "mtb/image"
    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("RGBA",)
    FUNCTION = "premultiply"

    def premultiply(self, image, mask, invert):
        images = tensor2pil(image)
        masks = tensor2pil(mask) if invert else tensor2pil(1.0 - mask)
        single = len(mask) == 1
        masks = [x.convert("L") for x in masks]

        out = []
        for i, img in enumerate(images):
            cur_mask = masks[0] if single else masks[i]

            img.putalpha(cur_mask)
            out.append(img)

        # if invert:
        #     image = Image.composite(image,Image.new("RGBA", image.size, color=(0,0,0,0)), mask)
        # else:
        #     image = Image.composite(Image.new("RGBA", image.size, color=(0,0,0,0)), image, mask)

        return (pil2tensor(out),)

```
