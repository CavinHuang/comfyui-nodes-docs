
# Documentation
- Class name: RegionalIPAdapterColorMask __Inspire
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

这个节点旨在根据颜色遮罩来应用局部图像处理适配。它能够将特定的图像嵌入和调整集成到图像的指定区域中（通过颜色识别），从而实现局部图像修改或增强。

# Input types
## Required
- color_mask
    - 指定将应用颜色遮罩的图像，作为局部适配的基础。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_color
    - 定义用于识别图像中感兴趣区域的颜色，以进行适配。
    - Comfy dtype: STRING
    - Python dtype: str
- image
    - 目标图像，即适配效果的应用对象，为应用的效果提供上下文。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- weight
    - 决定应用于指定区域的嵌入的强度或影响力。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 指定与嵌入一起应用的噪声级别，用于适配效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 指定应用权重到嵌入的方法，提供原始、线性或通道惩罚等选项，以增加适配的灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- start_at
    - 标记适配过程中效果应用的起始点，允许分阶段或渐进式实施。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 定义效果应用的终点，能够精确控制适配的范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unfold_batch
    - 一个布尔标志，设置时允许批量处理图像，提高适配效率。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Optional
- faceid_v2
    - 可选的布尔标志，用于启用或禁用人脸识别版本2，以实现更精细的适配。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- weight_v2
    - 版本2适配的可选权重参数，提供对适配强度的额外控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- combine_embeds
    - 指定组合嵌入的方法，选项包括连接、加法、减法、平均和归一化平均，为效果应用提供多样性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- neg_image
    - 可选的负面图像，用于指定区域内不希望出现的效果或调整，为主图像提供平衡。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- regional_ipadapter
    - 适配后的图像处理设置，封装了基于指定颜色遮罩和嵌入的局部适配。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: IPAdapterConditioning
- mask
    - 基于指定颜色生成的遮罩，识别适配的感兴趣区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),
                
                "image": ("IMAGE",),
                "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                "noise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "weight_type": (["original", "linear", "channel penalty"], ),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "unfold_batch": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "faceid_v2": ("BOOLEAN", {"default": False }),
                "weight_v2": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "neg_image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("REGIONAL_IPADAPTER", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, color_mask, mask_color, image, weight, noise, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, faceid_v2=False, weight_v2=False, combine_embeds="concat", neg_image=None):
        mask = color_to_mask(color_mask, mask_color)
        cond = IPAdapterConditioning(mask, weight, weight_type, noise=noise, image=image, neg_image=neg_image, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, weight_v2=weight_v2, combine_embeds=combine_embeds)
        return (cond, mask)

```
