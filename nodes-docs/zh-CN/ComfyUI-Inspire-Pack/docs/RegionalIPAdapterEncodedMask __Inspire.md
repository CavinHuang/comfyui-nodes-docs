
# Documentation
- Class name: RegionalIPAdapterEncodedMask __Inspire
- Category: InspirePack/Regional
- Output node: False

该节点专门用于在InspirePack框架内应用基于编码掩码的图像处理调整，利用区域IP适配器技术根据指定的掩码和权重有条件地修改图像嵌入。

# Input types
## Required
- mask
    - 掩码输入指定了图像中需要进行条件嵌入调整的区域，通过定义重点处理的区域在节点操作中发挥关键作用。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- embeds
    - 表示要应用于图像指定区域的所需调整或特征的嵌入，基于掩码影响最终输出。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor
- weight
    - 一个浮点值，用于确定应用于图像的嵌入调整的强度，允许对效果强度进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float
- weight_type
    - 指定将权重应用于嵌入的方法，提供原始、线性或通道惩罚等选项，以实现多样化的调整效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- start_at
    - 定义效果应用在图像处理中的起始点，实现分阶段调整。
    - Comfy dtype: FLOAT
    - Python dtype: float
- end_at
    - 设置效果应用的终点，允许精确控制调整的范围。
    - Comfy dtype: FLOAT
    - Python dtype: float
- unfold_batch
    - 一个布尔标志，当为真时，单独处理批次中的每个项目，增强处理批量输入的灵活性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

## Optional
- neg_embeds
    - 可选的负面嵌入，可用于指定在特定区域需要避免的特征或调整，添加了反向效果的能力。
    - Comfy dtype: EMBEDS
    - Python dtype: torch.Tensor

# Output types
- regional_ipadapter
    - 基于编码掩码和指定参数生成输入的条件版本，反映了目标调整。
    - Comfy dtype: REGIONAL_IPADAPTER
    - Python dtype: IPAdapterConditioning


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalIPAdapterEncodedMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mask": ("MASK",),

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

    RETURN_TYPES = ("REGIONAL_IPADAPTER", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, mask, embeds, weight, weight_type, start_at=0.0, end_at=1.0, unfold_batch=False, neg_embeds=None):
        cond = IPAdapterConditioning(mask, weight, weight_type, embeds=embeds, start_at=start_at, end_at=end_at, unfold_batch=unfold_batch, neg_embeds=neg_embeds)
        return (cond, )

```
