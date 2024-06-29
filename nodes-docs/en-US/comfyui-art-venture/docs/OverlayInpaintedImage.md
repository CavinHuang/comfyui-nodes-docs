---
tags:
- Image
- ImageComposite
---

# Overlay Inpainted Image
## Documentation
- Class name: `OverlayInpaintedImage`
- Category: `Art Venture/Inpainting`
- Output node: `False`

This node is designed to overlay an inpainted image onto another image, potentially within a specified crop region. It ensures that the overlay operation respects the dimensions and batch sizes of the input images, blending them seamlessly to produce a composite output.
## Input types
### Required
- **`inpainted`**
    - The inpainted image tensor to be overlaid onto the base image. It plays a crucial role in the overlay process by providing the content that fills in the missing or altered parts of the original image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`overlay_image`**
    - The base image tensor onto which the inpainted image will be overlaid. This image serves as the backdrop for the inpainted content, integrating both to create a cohesive visual output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`crop_region`**
    - A tensor specifying the region within the base image where the inpainted image should be overlaid. This allows for precise control over the placement and integration of the inpainted content within the larger image context.
    - Comfy dtype: `CROP_REGION`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image tensor after overlaying the inpainted image onto the base image, within the specified crop region if applicable. This image combines the visual elements of both inputs in a unified manner.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class OverlayInpaintedImage:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "inpainted": ("IMAGE",),
                "overlay_image": ("IMAGE",),
                "crop_region": ("CROP_REGION",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    CATEGORY = "Art Venture/Inpainting"
    FUNCTION = "overlay"

    def overlay(self, inpainted: torch.Tensor, overlay_image: torch.Tensor, crop_region: torch.Tensor):
        if inpainted.shape[0] != overlay_image.shape[0]:
            raise ValueError("inpainted and overlay_image must have same batch size")
        if inpainted.shape[0] != crop_region.shape[0]:
            raise ValueError("inpainted and crop_region must have same batch size")

        images = []
        for image, overlay, region in zip(inpainted, overlay_image, crop_region):
            image = tensor2pil(image.unsqueeze(0))
            overlay = tensor2pil(overlay.unsqueeze(0), mode="RGBA")

            x1, y1, x2, y2 = region.tolist()
            if (x1, y1, x2, y2) == (0, 0, 0, 0):
                pass
            else:
                base_image = Image.new("RGBA", (overlay.width, overlay.height))
                image = resize_image(image, x2 - x1, y2 - y1, ResizeMode.RESIZE_TO_FILL)
                base_image.paste(image, (x1, y1))
                image = base_image

            image = image.convert("RGBA")
            image.alpha_composite(overlay)
            image = image.convert("RGB")

            images.append(pil2tensor(image))

        return (torch.cat(images, dim=0),)

```
