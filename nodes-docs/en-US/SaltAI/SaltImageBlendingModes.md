---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Composite Images
## Documentation
- Class name: `SaltImageBlendingModes`
- Category: `SALT/Image/Composite`
- Output node: `False`

This node is designed for blending two sets of images together using a variety of blending modes. It allows for the adjustment of blend percentages and the application of masks to control the blending process, offering a flexible approach to creating composite images.
## Input types
### Required
- **`images_a`**
    - The first set of images to be blended. These serve as the base layer in the blending process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`images_b`**
    - The second set of images to be blended with the first set. These images act as the overlay layer.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`mode`**
    - Specifies the blending mode to be used. Each mode applies a different algorithm for combining the images, affecting the visual outcome of the blend.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`blend_percentage`**
    - Determines the intensity of the blend between the two image sets. A higher percentage results in a stronger presence of the overlay images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`masks`**
    - Optional masks that can be applied to the images to control where the blending occurs. Useful for creating more precise or complex composite images.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The resulting set of blended images.
    - Python dtype: `torch.Tensor`
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
