
# Documentation
- Class name: RegionalIPAdapterMask __Inspire
- Category: InspirePack/Regional
- Output node: False

该节点专门用于使用遮罩应用区域性图像处理适配，从而影响生成过程。它通过调整图像特定区域的影响来微调图像生成，增强对视觉输出的控制。

# Input types
## Required
- mask
    - 遮罩参数指定图像中要受IPAdapter影响的区域，允许进行有针对性的调整。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- image
    - 图像参数表示要适配的目标图像，作为区域性处理的画布。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- weight
    - 权重决定了嵌入在遮罩区域内的影响强度，提供了在图像原始和适配方面之间平衡的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise
    - 噪声在指定区域内的适配过程中添加了一定程度的随机性或纹理，增强了真实感或艺术效果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 权重类型定义了在遮罩区域内应用权重的方法，允许使用不同的影响策略（例如线性、原始、通道惩罚）。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- start_at
    - 起始点指定了在生成过程中适配效果的开始点，实现分阶段应用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 结束点定义了适配效果的终点，允许精确控制影响的持续时间。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unfold_batch
    - 展开批次是一个布尔参数，启用时允许批量处理多个图像，提高效率。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Optional
- faceid_v2
    - FaceID v2是一个可选的布尔参数，启用时应用第二版人脸识别技术，实现更精确的适配。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- weight_v2
    - 权重v2允许使用替代的加权机制，提供对适配强度的额外控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- combine_embeds
    - 组合嵌入指定了组合多个嵌入向量的方法，影响遮罩区域内的整体风格或特征表示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- neg_image
    - 负面图像允许指定一个在遮罩区域内对生成产生负面影响的图像，提供了一种减去某些特征或风格的方法。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- regional_ipadapter
    - 输出是一个基于指定区域参数进行适配的条件模型或进程，可用于进一步的图像生成任务。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: CustomType


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),

                "image": ("IMAGE",),
                "weight": ("FLOAT", {"default": 0.7, "min": -1, "max": 3, "step": 0.05}),
                "noise": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.01}),
                "weight_type": (["original", "linear", "channel penalty"],),
                "start_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "unfold_batch": ("BOOLEAN", {"default": False}),
            },
            "optional": {
                "faceid_v2": ("BOOLEAN", {"default": False}),
                "weight_v2": ("FLOAT", {"default": 1.0, "min": -1, "max": 3, "step": 0.05}),
                "combine_embeds": (["concat", "add", "subtract", "average", "norm average"],),
                "neg_image": ("IMAGE",),
            }
        }

    RETURN_TYPES = ("REGIONAL_IPADAPTER", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, mask, image, weight, noise, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, faceid_v2=False, weight_v2=False, combine_embeds="concat", neg_image=None):
        cond = IPAdapterConditioning(mask, weight, weight_type, noise=noise, image=image, neg_image=neg_image, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, weight_v2=weight_v2, combine_embeds=combine_embeds)
        return (cond, )

```
