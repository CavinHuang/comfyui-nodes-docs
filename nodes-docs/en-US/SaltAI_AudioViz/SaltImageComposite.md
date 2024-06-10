---
tags:
- Image
- ImageBlend
- ImageComposite
---

# Scheduled Image Composite
## Documentation
- Class name: `SaltImageComposite`
- Category: `SALT/Scheduling/Image`
- Output node: `False`

The SaltImageComposite node is designed for creating complex image compositions by blending or layering multiple images according to specified schedules. This node enables the dynamic combination of images, facilitating the creation of visually rich and varied outputs.
## Input types
### Required
- **`images_a`**
    - The first set of images to be used in the compositing process. These images serve as one of the primary layers for the composition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`images_b`**
    - The second set of images to be used in the compositing process. These images act as the other primary layer for the composition, which will be blended with the first set based on the specified mode.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image]`
- **`mode`**
    - Defines the method of blending the two image sets. The mode determines how images_a and images_b are combined, influencing the visual outcome of the composite.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`masks`**
    - Optional masks that can be applied to the images during the compositing process. Masks allow for more controlled blending by specifying areas of the images to be affected or protected.
    - Comfy dtype: `MASK`
    - Python dtype: `List[Mask]`
- **`blend_schedule`**
    - An optional schedule that dictates the blending intensity or method over time, allowing for dynamic changes in the compositing process.
    - Comfy dtype: `LIST`
    - Python dtype: `List[Any]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - The resulting images after applying the compositing operations. This output showcases the final composites, blending all input images according to the defined modes and schedules.
    - Python dtype: `List[Image]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltImageComposite:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_a": ("IMAGE",),
                "images_b": ("IMAGE",),
                "mode": ([
                    "add",
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
                    "soft_light"
                ],),
            },
            "optional": {
                "masks": ("MASK",),
                "blend_schedule": ("LIST", ),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("images",)
    FUNCTION = "blend"
    CATEGORY = f"SALT/Scheduling/Image"

    def blend(self, images_a, images_b, mode, blend_schedule=[1.0], masks=None):
        blended_images = []
        min_length = min(len(images_a), len(images_b))

        if len(blend_schedule) < min_length:
            blend_schedule += [blend_schedule[-1]] * (min_length - len(blend_schedule))

        for i in range(min_length):
            img_a = tensor2pil(images_a[i].unsqueeze(0))
            img_b = tensor2pil(images_b[i].unsqueeze(0))
            img_b_resized = img_b.resize(img_a.size, Image.LANCZOS).convert(img_a.mode)

            if mode == "add":
                base_image = ImageChops.add(img_a, img_b_resized, scale=2.0, offset=int(255 * (1 - blend_schedule[i])))
            else:
                base_image = getattr(pilgram.css.blending, mode)(img_a, img_b_resized)

            blend_mask = Image.new("L", img_a.size, int(255 * blend_schedule[i]))
            out_image = Image.composite(base_image, img_a, blend_mask)

            if isinstance(masks, torch.Tensor):
                mask = mask2pil(masks[i if len(masks) > i else -1].unsqueeze(0)).resize(img_a.size, Image.LANCZOS).convert("L")
                final_image = Image.composite(out_image, img_a, mask)
            else:
                final_image = out_image

            blended_images.append(pil2tensor(final_image))

        blended_images_batch = torch.cat(blended_images, dim=0)
        return (blended_images_batch, )

```
