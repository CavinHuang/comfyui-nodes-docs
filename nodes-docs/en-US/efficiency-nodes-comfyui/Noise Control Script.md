---
tags:
- Noise
---

# Noise Control Script
## Documentation
- Class name: `Noise Control Script`
- Category: `Efficiency Nodes/Scripts`
- Output node: `False`

The TSC_Noise_Control_Script node is designed to integrate and manage noise sources and seed variations within the ComfyUI framework. It allows for the customization of noise generation and seed manipulation, enhancing the control over the randomness and variability in generated outputs. This node serves as a pivotal element in adjusting the noise characteristics and seed behavior, thereby offering a nuanced approach to managing the stochastic elements of the generation process.
## Input types
### Required
- **`rng_source`**
    - Specifies the source of randomness for noise generation, allowing selection from CPU, GPU, or NV options. This choice influences the computational backend for noise generation, impacting performance and compatibility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`cfg_denoiser`**
    - A boolean flag that enables or disables the configuration denoiser, affecting the noise filtering process during generation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`add_seed_noise`**
    - Determines whether additional noise based on a seed value should be introduced, adding another layer of variability to the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`seed`**
    - The seed value for noise generation, providing a basis for reproducibility and variation in the noise applied.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`weight`**
    - Defines the weight of the seed noise, adjusting the intensity of the noise effect on the output.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`script`**
    - An optional script parameter that can be modified or extended with noise settings, offering flexibility in script-based customization.
    - Comfy dtype: `SCRIPT`
    - Python dtype: `Dict`
## Output types
- **`SCRIPT`**
    - Comfy dtype: `SCRIPT`
    - Returns a modified or extended script with applied noise settings, facilitating customized noise control within the generation process.
    - Python dtype: `Dict`
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
