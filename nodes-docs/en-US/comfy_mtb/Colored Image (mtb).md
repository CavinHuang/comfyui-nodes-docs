---
tags:
- Color
---

# Colored Image (mtb)
## Documentation
- Class name: `Colored Image (mtb)`
- Category: `mtb/generate`
- Output node: `False`

The Colored Image node is designed to apply color transformations to images, enabling the enhancement or alteration of their visual appearance through various color adjustment techniques.
## Input types
### Required
- **`color`**
    - The 'color' parameter defines the primary color to be applied to the image, influencing its overall hue and tone.
    - Comfy dtype: `COLOR`
    - Python dtype: `str`
- **`width`**
    - The 'width' parameter specifies the desired width of the output image, allowing for size customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The 'height' parameter sets the desired height of the output image, enabling size adjustments to fit specific requirements.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`foreground_image`**
    - The 'foreground_image' parameter allows for the overlay of an image atop the colored background, adding complexity to the visual output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`foreground_mask`**
    - The 'foreground_mask' parameter specifies an alpha mask for the foreground image, determining transparency and blending with the background.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output is an image that has been transformed by applying the specified color and background to the given mask.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_ColoredImage:
    """Constant color image of given size."""

    def __init__(self) -> None:
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "color": ("COLOR",),
                "width": ("INT", {"default": 512, "min": 16, "max": 8160}),
                "height": ("INT", {"default": 512, "min": 16, "max": 8160}),
            },
            "optional": {
                "foreground_image": ("IMAGE",),
                "foreground_mask": ("MASK",),
            },
        }

    CATEGORY = "mtb/generate"

    RETURN_TYPES = ("IMAGE",)

    FUNCTION = "render_img"

    def resize_and_crop(self, img, target_size):
        # Calculate scaling factors for both dimensions
        scale_x = target_size[0] / img.width
        scale_y = target_size[1] / img.height

        # Use the smaller scaling factor to maintain aspect ratio
        scale = max(scale_x, scale_y)

        # Resize the image based on calculated scale
        new_size = (int(img.width * scale), int(img.height * scale))
        img = img.resize(new_size, Image.LANCZOS)

        # Calculate cropping coordinates
        left = (img.width - target_size[0]) / 2
        top = (img.height - target_size[1]) / 2
        right = (img.width + target_size[0]) / 2
        bottom = (img.height + target_size[1]) / 2

        # Crop and return the image
        return img.crop((left, top, right, bottom))

    def resize_and_crop_thumbnails(self, img, target_size):
        img.thumbnail(target_size, Image.LANCZOS)
        left = (img.width - target_size[0]) / 2
        top = (img.height - target_size[1]) / 2
        right = (img.width + target_size[0]) / 2
        bottom = (img.height + target_size[1]) / 2
        return img.crop((left, top, right, bottom))

    def render_img(
        self,
        color,
        width,
        height,
        foreground_image: torch.Tensor | None = None,
        foreground_mask: torch.Tensor | None = None,
    ):
        image = Image.new("RGBA", (width, height), color=color)
        output = []
        if foreground_image is not None:
            fg_masks = [None] * foreground_image.size()[0]

            if foreground_mask is not None:
                fg_size = foreground_image.size()[0]
                mask_size = foreground_mask.size()[0]

                if fg_size == 1 and mask_size > fg_size:
                    foreground_image = foreground_image.repeat(
                        mask_size, 1, 1, 1
                    )

                if foreground_image.size()[0] != foreground_mask.size()[0]:
                    raise ValueError(
                        "Foreground image and mask must have same batch size"
                    )
                fg_masks = tensor2pil(foreground_mask.unsqueeze(-1))

            fg_images = tensor2pil(foreground_image)

            for fg_image, fg_mask in zip(fg_images, fg_masks):
                # Resize and crop if dimensions mismatch
                if fg_image.size != image.size:
                    fg_image = self.resize_and_crop(fg_image, image.size)
                    if fg_mask:
                        fg_mask = self.resize_and_crop(fg_mask, image.size)

                if fg_mask:
                    output.append(
                        Image.composite(
                            fg_image.convert("RGBA"),
                            image,
                            fg_mask,
                        ).convert("RGB")
                    )
                else:
                    if fg_image.mode != "RGBA":
                        raise ValueError(
                            "Foreground image must be in 'RGBA' mode "
                            f"when no mask is provided, got {fg_image.mode}"
                        )
                    output.append(
                        Image.alpha_composite(image, fg_image).convert("RGB")
                    )

        else:
            if foreground_mask is not None:
                log.warn("Mask ignored because no foreground image is given")
            output.append(image.convert("RGB"))

        output = pil2tensor(output)

        return (output,)

```
