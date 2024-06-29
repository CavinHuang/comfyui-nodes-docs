---
tags:
- DepthMap
- Image
- Inpaint
---

# Prepare Image & Mask for Inpaint
## Documentation
- Class name: `PrepareImageAndMaskForInpaint`
- Category: `Art Venture/Inpainting`
- Output node: `False`

This node prepares an image and its corresponding mask for the inpainting process by applying various preprocessing steps such as resizing, blurring, and adjusting the mask to ensure it is properly aligned and formatted for inpainting algorithms.
## Input types
### Required
- **`image`**
    - The input image tensor that needs inpainting, which is a crucial component for the inpainting process as it provides the visual context.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mask`**
    - The mask tensor indicating areas to inpaint, essential for identifying the regions within the image that require restoration or modification.
    - Comfy dtype: `MASK`
    - Python dtype: `torch.Tensor`
- **`mask_blur`**
    - An integer specifying the amount of blur to apply to the mask, which helps in smoothing the edges of the mask for a more natural inpainting result.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`inpaint_masked`**
    - A boolean indicating whether to inpaint the masked areas, guiding the inpainting process on which regions to focus.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`mask_padding`**
    - An integer defining the padding around the mask, which is used to adjust the focus area of the inpainting process.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`inpaint_image`**
    - Comfy dtype: `IMAGE`
    - The inpainted image after applying the inpainting algorithm, showcasing the restored or modified regions.
    - Python dtype: `torch.Tensor`
- **`inpaint_mask`**
    - Comfy dtype: `MASK`
    - The processed mask after applying the specified preprocessing steps, ready for use in the inpainting process.
    - Python dtype: `torch.Tensor`
- **`overlay_image`**
    - Comfy dtype: `IMAGE`
    - An image that combines the original and inpainted images, providing a visual comparison between them.
    - Python dtype: `torch.Tensor`
- **`crop_region`**
    - Comfy dtype: `CROP_REGION`
    - The region of the image that was selected for inpainting, indicating the focus area of the process.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PrepareImageAndMaskForInpaint:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "mask": ("MASK",),
                "mask_blur": ("INT", {"default": 4, "min": 0, "max": 64}),
                "inpaint_masked": ("BOOLEAN", {"default": False}),
                "mask_padding": ("INT", {"default": 32, "min": 0, "max": 256}),
            }
        }

    RETURN_TYPES = ("IMAGE", "MASK", "IMAGE", "CROP_REGION")
    RETURN_NAMES = ("inpaint_image", "inpaint_mask", "overlay_image", "crop_region")
    CATEGORY = "Art Venture/Inpainting"
    FUNCTION = "prepare"

    def prepare(
        self,
        image: torch.Tensor,
        mask: torch.Tensor,
        # resize_mode: str,
        mask_blur: int,
        inpaint_masked: bool,
        mask_padding: int,
    ):
        if image.shape[0] != mask.shape[0]:
            raise ValueError("image and mask must have same batch size")

        if image.shape[1] != mask.shape[1] or image.shape[2] != mask.shape[2]:
            raise ValueError("image and mask must have same dimensions")

        height, width = image.shape[1:3]

        masks = []
        images = []
        overlay_masks = []
        overlay_images = []
        crop_regions = []

        for img, msk in zip(image, mask):
            np_mask: np.ndarray = msk.cpu().numpy()

            if mask_blur > 0:
                kernel_size = 2 * int(2.5 * mask_blur + 0.5) + 1
                np_mask = cv2.GaussianBlur(np_mask, (kernel_size, kernel_size), mask_blur)

            pil_mask = numpy2pil(np_mask, "L")
            crop_region = None

            if inpaint_masked:
                crop_region = get_crop_region(np_mask, mask_padding)
                crop_region = expand_crop_region(crop_region, width, height, width, height)
                # crop mask
                overlay_mask = pil_mask
                pil_mask = resize_image(pil_mask.crop(crop_region), width, height, ResizeMode.RESIZE_TO_FIT)
                pil_mask = pil_mask.convert("L")
            else:
                np_mask = np.clip((np_mask.astype(np.float32)) * 2, 0, 255).astype(np.uint8)
                overlay_mask = numpy2pil(np_mask, "L")

            pil_img = tensor2pil(img)
            pil_img = flatten_image(pil_img)

            image_masked = Image.new("RGBa", (pil_img.width, pil_img.height))
            image_masked.paste(pil_img.convert("RGBA").convert("RGBa"), mask=ImageOps.invert(overlay_mask))
            overlay_images.append(pil2tensor(image_masked.convert("RGBA")))
            overlay_masks.append(pil2tensor(overlay_mask))

            if crop_region is not None:
                pil_img = resize_image(pil_img.crop(crop_region), width, height, ResizeMode.RESIZE_TO_FIT)
            else:
                crop_region = (0, 0, 0, 0)

            images.append(pil2tensor(pil_img))
            masks.append(pil2tensor(pil_mask))
            crop_regions.append(torch.tensor(crop_region, dtype=torch.int64))

        return (
            torch.cat(images, dim=0),
            torch.cat(masks, dim=0),
            torch.cat(overlay_images, dim=0),
            torch.stack(crop_regions),
        )

```
