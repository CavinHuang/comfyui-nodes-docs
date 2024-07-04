
# Documentation
- Class name: OverlayInpaintedImage
- Category: Art Venture/Inpainting
- Output node: False

OverlayInpaintedImage节点旨在将一个修复后的图像叠加到另一个图像上，可能会在指定的裁剪区域内进行。它确保叠加操作尊重输入图像的尺寸和批量大小，将它们无缝地融合以生成一个复合输出。

# Input types
## Required
- inpainted
    - 要叠加到基础图像上的修复图像张量。它在叠加过程中扮演着至关重要的角色，提供填充原始图像中缺失或改变部分的内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- overlay_image
    - 作为修复图像叠加基础的图像张量。这个图像充当修复内容的背景，将两者整合以创建一个连贯的视觉输出。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- crop_region
    - 指定基础图像中应该叠加修复图像的区域的张量。这允许精确控制修复内容在更大图像上下文中的放置和集成。
    - Comfy dtype: CROP_REGION
    - Python dtype: torch.Tensor

# Output types
- image
    - 在基础图像上叠加修复图像后的结果图像张量，如果适用的话，会在指定的裁剪区域内进行。这个图像以统一的方式结合了两个输入的视觉元素。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


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
