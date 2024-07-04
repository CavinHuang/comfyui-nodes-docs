
# Documentation
- Class name: RegionalIPAdapterEncodedColorMask __Inspire
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

RegionalIPAdapterEncodedColorMask __Inspire节点专门用于基于编码的彩色遮罩来应用局部图像处理适配。它将特定的基于颜色的遮罩区域与嵌入调整相结合，允许进行有针对性的图像修改，同时尊重用户定义的空间和基于颜色的约束。

# Input types
## Required
- color_mask
    - 用于定义适配区域的彩色遮罩图像。它作为空间指南，根据颜色匹配确定应用适配的位置。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_color
    - 一个指定颜色的字符串，用于在彩色遮罩中识别感兴趣的区域。这个颜色充当一个关键字，用于隔离特定的处理区域。
    - Comfy dtype: STRING
    - Python dtype: str
- embeds
    - 代表要在指定区域内应用的所需调整或效果的嵌入。这些嵌入指导了适配过程。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- weight
    - 一个浮点值，决定了嵌入对适配过程的强度或影响。它调节了指定调整的应用强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 指定应用权重到嵌入的方法，提供了原始、线性或通道惩罚等选项，以微调适配效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- start_at
    - 一个浮点数，表示开始应用适配的起点（以层或步骤的进度表示），允许分阶段或渐进应用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 一个浮点数，表示适配应用的终点，实现对修改范围的精确控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unfold_batch
    - 一个布尔值，指示是否展开批次进行处理，影响适配如何跨多个实例应用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- neg_embeds
    - 可选的嵌入，代表负面调整或效果，提供了一种方法来指定在区域内应避免或抵消的适配。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor

# Output types
- regional_ipadapter
    - 局部图像处理适配的结果，在定义的彩色遮罩区域内融合了指定的嵌入和调整。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: IPAdapterConditioning
- mask
    - 用于指导适配的处理后遮罩，可能基于指定的颜色和感兴趣区域进行了修改。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterEncodedColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),

                "embeds": ("EMBEDS",),
                "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                "weight_type": (["original", "linear", "channel penalty"],),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "unfold_batch": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "neg_embeds": ("EMBEDS",),
            }
        }

    RETURN_TYPES = ("REGIONAL_IPADAPTER", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, color_mask, mask_color, embeds, weight, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, neg_embeds=None):
        mask = color_to_mask(color_mask, mask_color)
        cond = IPAdapterConditioning(mask, weight, weight_type, embeds=embeds, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, neg_embeds=neg_embeds)
        return (cond, mask)

```
