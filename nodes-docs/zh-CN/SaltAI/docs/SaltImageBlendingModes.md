
# Documentation
- Class name: SaltImageBlendingModes
- Category: SALT/Image/Composite
- Output node: False

该节点专为将两组图像混合在一起而设计，可使用各种混合模式。它允许调整混合百分比并应用蒙版来控制混合过程，为创建合成图像提供了灵活的方法。

# Input types
## Required
- images_a
    - 要混合的第一组图像。这些图像在混合过程中作为基础层。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- images_b
    - 要与第一组图像混合的第二组图像。这些图像作为叠加层。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mode
    - 指定要使用的混合模式。每种模式应用不同的算法来组合图像，影响混合的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- blend_percentage
    - 确定两组图像之间的混合强度。较高的百分比会导致叠加图像的存在感更强。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- masks
    - 可选的蒙版，可应用于图像以控制混合发生的位置。对于创建更精确或复杂的合成图像很有用。
    - Comfy dtype: MASK
    - Python dtype: Optional[torch.Tensor]

# Output types
- images
    - 混合后的图像集。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SaltImageBlendingModes:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "mode": ([
                    "normal",
                    "color",
                    "color_burn",
                    "color_dodge",
                    "darken",
                    "difference",
                    "exclusion",
                    "hard_light",
                    "hue",
                    "lighten",
                    "multiply",
                    "overlay",
                    "screen",
                    "soft_light",
                ],),
                "blend_percentage": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
            },
            "optional": {
                "masks": ("MASK",),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)

    FUNCTION = "blend"
    CATEGORY = "SALT/Image/Composite"

    def blend(self, images_a, images_b, mode, blend_percentage, masks=None):
        blended_images = []

        if not isinstance(blend_percentage, list):
            blend_percentage = [blend_percentage]
        
        if isinstance(masks, torch.Tensor):
            masks = masks2pils(masks)

        for i in range(len(images_a)):
            img_a = tensor2pil(images_a[i].unsqueeze(0))
            img_b = tensor2pil(images_b[i if i < len(images_b) else -1].unsqueeze(0))
            img_b_resized = img_b.resize(img_a.size, Image.Resampling.BILINEAR).convert(img_a.mode)

            out_image = getattr(pilgram.css.blending, mode)(img_a, img_b_resized)

            if masks:
                mask_resized = masks[i if i < len(masks) else -1].resize(img_a.size, Image.Resampling.BILINEAR).convert('L')
                black_image = Image.new("L", img_a.size, 0)  # Ensure this black image matches the size
                blend_mask = Image.blend(black_image, mask_resized, blend_percentage[i if i < len(blend_percentage) else -1])
                final_image = Image.composite(out_image, img_a, blend_mask)
            else:
                blend_intensity = int(255 * blend_percentage[i if i < len(blend_percentage) else -1])
                blend_mask = Image.new("L", img_a.size, blend_intensity)
                final_image = Image.composite(out_image, img_a, blend_mask)

            blended_images.append(pil2tensor(final_image))

        blended_images_batch = torch.cat(blended_images, dim=0)
        return (blended_images_batch,)

```
