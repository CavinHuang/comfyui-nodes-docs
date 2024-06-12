---
tags:
- Crop
- Image
- ImageTransformation
---

# Uncrop (mtb)
## Documentation
- Class name: `Uncrop (mtb)`
- Category: `mtb/crop`
- Output node: `False`

The Uncrop (mtb) node is designed to reverse the cropping process on images, restoring them to their original dimensions or to a specified larger context. This node is essential for operations where the spatial context of an image needs to be preserved or reconstructed after it has been cropped for analysis or processing.
## Input types
### Required
- **`image`**
    - The original image that will serve as the background for the uncropping process. It defines the spatial context into which the cropped image will be placed.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`crop_image`**
    - The cropped image to be integrated back into the original image's context. This image is essential for the node's operation as it contains the content that needs to be restored.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`bbox`**
    - The bounding box specifying where the cropped image should be placed within the original image. This parameter is crucial for positioning the cropped content accurately.
    - Comfy dtype: `BBOX`
    - Python dtype: `Tuple[int, int, int, int]`
- **`border_blending`**
    - A parameter that controls the blending of the borders between the cropped image and the original image to ensure a seamless transition.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The image after the uncropping process has been applied, showing the cropped content seamlessly integrated into the original image's context.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MTB_Uncrop:
    """Uncrops an image to a given bounding box

    The bounding box can be given as a tuple of (x, y, width, height) or as a BBOX type
    The BBOX input takes precedence over the tuple input
    """

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "image": ("IMAGE",),
                "crop_image": ("IMAGE",),
                "bbox": ("BBOX",),
                "border_blending": (
                    "FLOAT",
                    {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.01},
                ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "do_crop"

    CATEGORY = "mtb/crop"

    def do_crop(self, image, crop_image, bbox, border_blending):
        def inset_border(image, border_width=20, border_color=(0)):
            width, height = image.size
            bordered_image = Image.new(
                image.mode, (width, height), border_color
            )
            bordered_image.paste(image, (0, 0))
            draw = ImageDraw.Draw(bordered_image)
            draw.rectangle(
                (0, 0, width - 1, height - 1),
                outline=border_color,
                width=border_width,
            )
            return bordered_image

        single = image.size(0) == 1
        if image.size(0) != crop_image.size(0):
            if not single:
                raise ValueError(
                    "The Image batch count is greater than 1, but doesn't match the crop_image batch count. If using batches they should either match or only crop_image must be greater than 1"
                )

        images = tensor2pil(image)
        crop_imgs = tensor2pil(crop_image)
        out_images = []
        for i, crop in enumerate(crop_imgs):
            if single:
                img = images[0]
            else:
                img = images[i]

            # uncrop the image based on the bounding box
            bb_x, bb_y, bb_width, bb_height = bbox

            paste_region = bbox_to_region(
                (bb_x, bb_y, bb_width, bb_height), img.size
            )
            # log.debug(f"Paste region: {paste_region}")
            # new_region = adjust_paste_region(img.size, paste_region)
            # log.debug(f"Adjusted paste region: {new_region}")
            # # Check if the adjusted paste region is different from the original

            crop_img = crop.convert("RGB")

            log.debug(f"Crop image size: {crop_img.size}")
            log.debug(f"Image size: {img.size}")

            if border_blending > 1.0:
                border_blending = 1.0
            elif border_blending < 0.0:
                border_blending = 0.0

            blend_ratio = (max(crop_img.size) / 2) * float(border_blending)

            blend = img.convert("RGBA")
            mask = Image.new("L", img.size, 0)

            mask_block = Image.new("L", (bb_width, bb_height), 255)
            mask_block = inset_border(mask_block, int(blend_ratio / 2), (0))

            mask.paste(mask_block, paste_region)
            log.debug(f"Blend size: {blend.size} | kind {blend.mode}")
            log.debug(
                f"Crop image size: {crop_img.size} | kind {crop_img.mode}"
            )
            log.debug(f"BBox: {paste_region}")
            blend.paste(crop_img, paste_region)

            mask = mask.filter(ImageFilter.BoxBlur(radius=blend_ratio / 4))
            mask = mask.filter(
                ImageFilter.GaussianBlur(radius=blend_ratio / 4)
            )

            blend.putalpha(mask)
            img = Image.alpha_composite(img.convert("RGBA"), blend)
            out_images.append(img.convert("RGB"))

        return (pil2tensor(out_images),)

```
