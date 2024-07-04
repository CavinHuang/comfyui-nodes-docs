
# Documentation
- Class name: RegionalPromptColorMask __Inspire
- Category: InspirePack/Regional
- Output node: False

RegionalPromptColorMask节点旨在基于颜色掩码生成区域提示。它对图像应用基于颜色的分割，创建可以单独提示的不同区域，用于创意或有针对性的图像生成任务。该节点通过允许用户通过颜色编码的掩码影响图像的特定区域，促进了图像生成过程的定制化。

# Input types
## Required
- basic_pipe
    - 图像处理或生成的基础管道，为后续的区域提示应用奠定基础。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: object
- color_mask
    - 作为掩码的图像输入，其中特定颜色指示应用不同提示的区域。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- mask_color
    - 指定在color_mask中用于定义感兴趣区域的颜色的字符串。
    - Comfy dtype: STRING
    - Python dtype: str
- cfg
    - 调整配置强度的浮点值，影响应用提示的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 指定在生成过程中使用的采样方法，影响输出的多样性和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 确定控制生成过程的调度算法，影响随时间推移提示的应用方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- wildcard_prompt
    - 用于动态的、用户定义的提示的字符串输入，可应用于指定区域，增强创意控制。
    - Comfy dtype: STRING
    - Python dtype: str
- controlnet_in_pipe
    - 指示是保留还是覆盖管道中的控制网络的布尔值，影响最终的图像生成。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- sigma_factor
    - 调整sigma因子的浮点值，微调提示对区域的应用。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- regional_prompts
    - 生成的区域提示，针对输入图像的指定区域进行定制。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: object
- mask
    - 从指定颜色生成的掩码，用于划分提示应用的区域。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalPromptColorMask:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "basic_pipe": ("BASIC_PIPE",),
                "color_mask": ("IMAGE",),
                "mask_color": ("STRING", {"multiline": False, "default": "#FFFFFF"}),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (common.SCHEDULERS,),
                "wildcard_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "wildcard prompt"}),
                "controlnet_in_pipe": ("BOOLEAN", {"default": False, "label_on": "Keep", "label_off": "Override"}),
                "sigma_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("REGIONAL_PROMPTS", "MASK")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, basic_pipe, color_mask, mask_color, cfg, sampler_name, scheduler, wildcard_prompt, controlnet_in_pipe=False, sigma_factor=1.0):
        mask = color_to_mask(color_mask, mask_color)
        rp = RegionalPromptSimple().doit(basic_pipe, mask, cfg, sampler_name, scheduler, wildcard_prompt, controlnet_in_pipe, sigma_factor=sigma_factor)[0]
        return (rp, mask)

```
