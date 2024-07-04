
# Documentation
- Class name: GetSigma
- Category: latent/noise
- Output node: False

GetSigma节点旨在根据给定的模型、采样器、调度器和步骤参数计算特定的sigma值。它简化了与不同采样器和调度器交互的复杂性，为获取sigma值提供了一种简单直接的方法。这个sigma值对于控制生成模型中的噪声水平至关重要。

# Input types
## Required
- model
    - model参数指定用于sigma计算的生成模型。它对于根据模型的特性和配置确定适当的噪声水平至关重要。
    - Comfy dtype: MODEL
    - Python dtype: comfy.model_management.Model
- sampler_name
    - sampler_name参数标识要使用的特定采样策略。这个选择影响sigma值的计算和应用方式，将噪声注入过程调整为所选采样器的方法。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - scheduler参数决定了在生成过程中调整噪声水平的调度算法。它在微调指定步骤中sigma值的变化过程中起着关键作用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- steps
    - 指定sigma计算要考虑的总步数。它定义了评估起始步骤和结束步骤的范围，影响最终的sigma值。
    - Comfy dtype: INT
    - Python dtype: int
- start_at_step
    - 开始计算sigma的起始步骤。这个参数允许灵活地确定初始噪声水平，影响生成过程的早期阶段。
    - Comfy dtype: INT
    - Python dtype: int
- end_at_step
    - 停止计算sigma的结束步骤。它设置了噪声调整的最终点，影响生成模型输出的结果。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- float
    - 返回计算得到的sigma值，这是要应用的噪声水平的度量。这个值对于控制生成过程的保真度和多样性至关重要。
    - Comfy dtype: FLOAT
    - Python dtype: float


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class GetSigma:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL",),
            "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
            "scheduler": (comfy.samplers.KSampler.SCHEDULERS, ),
            "steps": ("INT", {"default": 10000, "min": 0, "max": 10000}),
            "start_at_step": ("INT", {"default": 0, "min": 0, "max": 10000}),
            "end_at_step": ("INT", {"default": 10000, "min": 1, "max": 10000}),
            }}
    
    RETURN_TYPES = ("FLOAT",)
    FUNCTION = "calc_sigma"

    CATEGORY = "latent/noise"
        
    def calc_sigma(self, model, sampler_name, scheduler, steps, start_at_step, end_at_step):
        device = comfy.model_management.get_torch_device()
        end_at_step = min(steps, end_at_step)
        start_at_step = min(start_at_step, end_at_step)
        sampler = comfy.samplers.KSampler(model, steps=steps, device=device, sampler=sampler_name, scheduler=scheduler, denoise=1.0, model_options=model.model_options)
        sigmas = sampler.sigmas
        sigma = sigmas[start_at_step] - sigmas[end_at_step]
        sigma /= model.model.latent_format.scale_factor
        return (sigma.cpu().numpy(),)

```
