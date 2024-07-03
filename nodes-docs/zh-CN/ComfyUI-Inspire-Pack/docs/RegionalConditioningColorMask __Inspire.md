
# Documentation
- Class name: RegionalConditioningColorMask __Inspire
- Category: InspirePack/Regional
- Output node: False

RegionalConditioningColorMask节点属于Inspire Pack，主要用于根据指定的颜色遮罩对输入的CLIP表示进行区域性调节。它通过叠加颜色遮罩、调整强度以及指定调节区域，实现了对图像特征的精确控制，从而在生成过程中提供更精细的操作。

# Input types
## Required
- clip
    - 作为区域性调节基础的CLIP表示，是进行目标操作的核心输入。
    - Comfy dtype: CLIP
    - Python dtype: str
- color_mask
    - 一个图像遮罩，用于指定需要调节的区域，基于提供的颜色。
    - Comfy dtype: IMAGE
    - Python dtype: Image
- mask_color
    - 用于从color_mask图像生成遮罩的颜色值，定义了进行调节的具体区域。
    - Comfy dtype: STRING
    - Python dtype: str
- strength
    - 决定了应用于指定区域的调节强度，允许对效果进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- set_cond_area
    - 指定要调节的图像区域，可以是默认区域或遮罩的边界，提供了灵活的目标选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- prompt
    - 引导调节过程的文本提示，影响遮罩区域内生成内容的特征。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- conditioning
    - 根据指定参数和遮罩修改后的条件CLIP表示。
    - Comfy dtype: CONDITIONING
    - Python dtype: tuple
- mask
    - 基于指定颜色生成的遮罩，用于调节。
    - Comfy dtype: MASK
    - Python dtype: Image


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RegionalConditioningColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "clip": ("CLIP", ),
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "set_cond_area": (["default", "mask bounds"],),
                "prompt": ("STRING", {"multiline": True, "placeholder": "prompt"}),
            },
        }

    RETURN_TYPES = ("CONDITIONING", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, clip, color_mask, mask_color, strength, set_cond_area, prompt):
        mask = color_to_mask(color_mask, mask_color)

        conditioning = nodes.CLIPTextEncode().encode(clip, prompt)[0]
        conditioning = nodes.ConditioningSetMask().append(conditioning, mask, set_cond_area, strength)[0]
        return (conditioning, mask)

```
