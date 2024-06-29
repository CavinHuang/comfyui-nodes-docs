---
tags:
- BackgroundRemoval
- Image
---

# Image Remove Background Rembg (mtb)
## Documentation
- Class name: `Image Remove Background Rembg (mtb)`
- Category: `mtb/image`
- Output node: `False`

This node specializes in removing the background from images using the Rembg tool, enhancing the focus on the primary subject by isolating it from its surroundings.
## Input types
### Required
- **`image`**
    - The input image from which the background is to be removed. It is the primary data on which the background removal process is executed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `IMAGE`
- **`alpha_matting`**
    - A boolean flag indicating whether alpha matting is to be applied for finer edge handling in the background removal process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`alpha_matting_foreground_threshold`**
    - Defines the threshold for foreground selection in the alpha matting process, affecting the precision of the subject's edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha_matting_background_threshold`**
    - Sets the threshold for background selection in the alpha matting process, influencing the accuracy of background removal.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`alpha_matting_erode_size`**
    - Determines the erode size in the alpha matting process, impacting the smoothness of the subject's edges.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`post_process_mask`**
    - A boolean flag that enables post-processing of the mask to refine the background removal results.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`bgcolor`**
    - Specifies the background color to be applied post-removal, allowing for customization of the resulting image's backdrop.
    - Comfy dtype: `COLOR`
    - Python dtype: `COLOR`
## Output types
- **`Image (rgba)`**
    - Comfy dtype: `IMAGE`
    - The resulting image with the background removed, presented in RGBA format to include transparency information.
    - Python dtype: `IMAGE`
- **`Mask`**
    - Comfy dtype: `MASK`
    - The mask generated during the background removal process, indicating areas of foreground and background.
    - Python dtype: `MASK`
- **`Image`**
    - Comfy dtype: `IMAGE`
    - The final image after background removal, without the alpha channel, suitable for use in contexts where transparency is not required.
    - Python dtype: `IMAGE`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_ImageRemoveBackgroundRembg:
    """Removes the background from the input using Rembg."""

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "alpha_matting": (
                    "BOOLEAN",
                    {"default": False},
                ),
                "alpha_matting_foreground_threshold": (
                    "INT",
                    {"default": 240, "min": 0, "max": 255},
                ),
                "alpha_matting_background_threshold": (
                    "INT",
                    {"default": 10, "min": 0, "max": 255},
                ),
                "alpha_matting_erode_size": (
                    "INT",
                    {"default": 10, "min": 0, "max": 255},
                ),
                "post_process_mask": (
                    "BOOLEAN",
                    {"default": False},
                ),
                "bgcolor": (
                    "COLOR",
                    {"default": "#000000"},
                ),
            },
        }

    RETURN_TYPES = (
        "IMAGE",
        "MASK",
        "IMAGE",
    )
    RETURN_NAMES = (
        "Image (rgba)",
        "Mask",
        "Image",
    )
    FUNCTION = "remove_background"
    CATEGORY = "mtb/image"

    # bgcolor: Optional[Tuple[int, int, int, int]]
    def remove_background(
        self,
        image,
        alpha_matting,
        alpha_matting_foreground_threshold,
        alpha_matting_background_threshold,
        alpha_matting_erode_size,
        post_process_mask,
        bgcolor,
    ):
        pbar = comfy.utils.ProgressBar(image.size(0))
        images = tensor2pil(image)

        out_img = []
        out_mask = []
        out_img_on_bg = []

        for img in images:
            img_rm = remove(
                data=img,
                alpha_matting=alpha_matting,
                alpha_matting_foreground_threshold=alpha_matting_foreground_threshold,
                alpha_matting_background_threshold=alpha_matting_background_threshold,
                alpha_matting_erode_size=alpha_matting_erode_size,
                session=None,
                only_mask=False,
                post_process_mask=post_process_mask,
                bgcolor=None,
            )

            # extract the alpha to a new image
            mask = img_rm.getchannel(3)

            # add our bgcolor behind the image
            image_on_bg = Image.new("RGBA", img_rm.size, bgcolor)

            image_on_bg.paste(img_rm, mask=mask)

            image_on_bg = image_on_bg.convert("RGB")

            out_img.append(img_rm)
            out_mask.append(mask)
            out_img_on_bg.append(image_on_bg)

            pbar.update(1)

        return (
            pil2tensor(out_img),
            pil2tensor(out_mask),
            pil2tensor(out_img_on_bg),
        )

```
