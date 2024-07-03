
# Documentation
- Class name: Noise Control Script
- Category: Efficiency Nodes/Scripts
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Noise Control Script节点旨在ComfyUI框架内整合和管理噪声源和种子变化。它允许自定义噪声生成和种子操作，增强对生成输出中随机性和可变性的控制。该节点作为调整噪声特性和种子行为的关键元素，为管理生成过程中的随机元素提供了一种细致入微的方法。

# Input types
## Required
- rng_source
    - 指定噪声生成的随机源，允许从CPU、GPU或NV选项中进行选择。这个选择影响噪声生成的计算后端，进而影响性能和兼容性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: List[str]
- cfg_denoiser
    - 一个布尔标志，用于启用或禁用配置去噪器，影响生成过程中的噪声过滤。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- add_seed_noise
    - 决定是否引入基于种子值的额外噪声，为输出增加另一层变异性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- seed
    - 噪声生成的种子值，为应用的噪声提供可重现性和变化的基础。
    - Comfy dtype: INT
    - Python dtype: int
- weight
    - 定义种子噪声的权重，调整噪声效果对输出的影响强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
## Optional
- script
    - 一个可选的脚本参数，可以通过噪声设置进行修改或扩展，为基于脚本的定制提供灵活性。
    - Comfy dtype: SCRIPT
    - Python dtype: Dict

# Output types
- SCRIPT
    - 返回一个带有应用噪声设置的修改或扩展脚本，便于在生成过程中进行自定义噪声控制。
    - Comfy dtype: SCRIPT
    - Python dtype: Dict


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)



## Source code
```python
class TSC_Noise_Control_Script:

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "rng_source": (["cpu", "gpu", "nv"],),
                "cfg_denoiser": ("BOOLEAN", {"default": False}),
                "add_seed_noise": ("BOOLEAN", {"default": False}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "weight": ("FLOAT", {"default": 0.015, "min": 0, "max": 1, "step": 0.001})},
            "optional": {"script": ("SCRIPT",)}
        }

    RETURN_TYPES = ("SCRIPT",)
    RETURN_NAMES = ("SCRIPT",)
    FUNCTION = "noise_control"
    CATEGORY = "Efficiency Nodes/Scripts"

    def noise_control(self, rng_source, cfg_denoiser, add_seed_noise, seed, weight, script=None):
        script = script or {}
        script["noise"] = (rng_source, cfg_denoiser, add_seed_noise, seed, weight)
        return (script,)

```
