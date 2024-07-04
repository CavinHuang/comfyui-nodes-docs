
# Documentation
- Class name: PrepareImageAndMaskForInpaint
- Category: Art Venture/Inpainting
- Output node: False

此节点为修复(inpainting)过程准备图像及其对应的蒙版。它应用了多种预处理步骤,如调整大小、模糊处理和调整蒙版,以确保蒙版与图像正确对齐并适合修复算法使用。

# Input types
## Required
- image
    - 需要进行修复的输入图像张量。作为修复过程的关键组成部分,它提供了视觉上下文信息。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask
    - 指示需要修复区域的蒙版张量。对于识别图像中需要修复或修改的区域至关重要。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- mask_blur
    - 指定应用于蒙版的模糊量的整数。这有助于平滑蒙版边缘,从而获得更自然的修复结果。
    - Comfy dtype: INT
    - Python dtype: int
- inpaint_masked
    - 布尔值,指示是否对蒙版区域进行修复。这引导修复过程关注哪些区域。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- mask_padding
    - 定义蒙版周围填充的整数。用于调整修复过程的焦点区域。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- inpaint_image
    - 应用修复算法后的修复图像,展示了修复或修改后的区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- inpaint_mask
    - 经过指定预处理步骤处理后的蒙版,已准备好用于修复过程。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- overlay_image
    - 将原始图像和修复图像结合的图像,提供两者之间的视觉比较。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- crop_region
    - 选择进行修复的图像区域,指示了修复过程的焦点区域。
    - Comfy dtype: CROP_REGION
    - Python dtype: torch.Tensor


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
