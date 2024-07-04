
# Documentation
- Class name: RegionalPromptSimple __Inspire
- Category: InspirePack/Regional
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

RegionalPromptSimple节点用于基于给定的基本管道配置和掩码生成区域性提示。它利用生成模型管道的基本组件，包括模型、clip和VAE设置，以及正面和负面提示，来创建针对特定区域的新提示。这个节点对于需要在图像特定区域内进行精确提示生成的任务至关重要，使得用户能够更精确地控制生成过程。

# Input types
## Required
- basic_pipe
    - 代表生成模型管道的基础组件，包括模型、clip、VAE以及正面和负面提示。它为区域性提示的生成定义了基础。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[torch.nn.Module, torch.nn.Module, torch.nn.Module, List[Tuple[str, Dict]], List[Tuple[str, Dict]]]
- mask
    - 一个二进制掩码，用于指定图像中的感兴趣区域。它在确定区域性提示的应用位置方面起着关键作用，允许进行有针对性的提示生成。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor
- cfg
    - 生成模型的配置设置，影响生成提示的细节和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 指定在生成过程中使用的采样方法，影响输出的多样性和质量。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 决定生成模型的调度算法，影响生成提示的进展和变化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- wildcard_prompt
    - 一个可以动态插入生成过程的可选提示，为提示设计提供灵活性和创造性。
    - Comfy dtype: STRING
    - Python dtype: str
- controlnet_in_pipe
    - 一个布尔标志，指示是否保留或覆盖管道中现有的控制设置，影响控制机制对生成过程的影响。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- sigma_factor
    - 采样过程中噪声级别的缩放因子，允许对提示生成的随机性和可变性进行微调。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- regional_prompts
    - 生成的区域性提示，针对图像中指定的感兴趣区域进行定制，实现对内容生成的精确和有针对性的控制。
    - Comfy dtype: REGIONAL_PROMPTS
    - Python dtype: List[Tuple[str, Dict]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class RegionalPromptSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "basic_pipe": ("BASIC_PIPE",),
                "mask": ("MASK",),
                "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                "scheduler": (common.SCHEDULERS,),
                "wildcard_prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "wildcard prompt"}),
                "controlnet_in_pipe": ("BOOLEAN", {"default": False, "label_on": "Keep", "label_off": "Override"}),
                "sigma_factor": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
            },
        }

    RETURN_TYPES = ("REGIONAL_PROMPTS", )
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Regional"

    def doit(self, basic_pipe, mask, cfg, sampler_name, scheduler, wildcard_prompt, controlnet_in_pipe=False, sigma_factor=1.0):
        if 'RegionalPrompt' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack',
                                          "To use 'RegionalPromptSimple' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use RegionalPromptSimple, you need to install 'ComfyUI-Impact-Pack'")

        model, clip, vae, positive, negative = basic_pipe

        iwe = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode']()
        kap = nodes.NODE_CLASS_MAPPINGS['KSamplerAdvancedProvider']()
        rp = nodes.NODE_CLASS_MAPPINGS['RegionalPrompt']()

        if wildcard_prompt != "":
            model, clip, new_positive, _ = iwe.doit(model=model, clip=clip, populated_text=wildcard_prompt)

            if controlnet_in_pipe:
                prev_cnet = None
                for t in positive:
                    if 'control' in t[1] and 'control_apply_to_uncond' in t[1]:
                        prev_cnet = t[1]['control'], t[1]['control_apply_to_uncond']
                        break

                if prev_cnet is not None:
                    for t in new_positive:
                        t[1]['control'] = prev_cnet[0]
                        t[1]['control_apply_to_uncond'] = prev_cnet[1]

        else:
            new_positive = positive

        basic_pipe = model, clip, vae, new_positive, negative

        sampler = kap.doit(cfg, sampler_name, scheduler, basic_pipe, sigma_factor=sigma_factor)[0]
        regional_prompts = rp.doit(mask, sampler)[0]

        return (regional_prompts, )

```
