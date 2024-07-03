
# Documentation
- Class name: SaltImageComposite
- Category: SALT/Scheduling/Image
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltImageComposite节点旨在通过根据指定的调度计划混合或叠加多个图像来创建复杂的图像组合。该节点实现了图像的动态组合，有助于创建视觉丰富且多样化的输出。

# Input types
## Required
- images_a
    - 用于合成过程的第一组图像。这些图像作为组合的主要层之一。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- images_b
    - 用于合成过程的第二组图像。这些图像作为组合的另一个主要层，将根据指定的模式与第一组图像混合。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]
- mode
    - 定义两组图像的混合方法。该模式决定了images_a和images_b如何组合，影响合成的视觉效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

## Optional
- masks
    - 可选的遮罩，可在合成过程中应用于图像。遮罩允许通过指定图像中受影响或受保护的区域来进行更受控制的混合。
    - Comfy dtype: MASK
    - Python dtype: List[Mask]
- blend_schedule
    - 一个可选的调度计划，用于随时间控制混合强度或方法，允许合成过程中的动态变化。
    - Comfy dtype: LIST
    - Python dtype: List[Any]

# Output types
- images
    - 应用合成操作后的结果图像。这个输出展示了最终的合成效果，根据定义的模式和调度计划混合所有输入图像。
    - Comfy dtype: IMAGE
    - Python dtype: List[Image]


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
