---
tags:
- RandomGeneration
- Seed
---

# Seed Everywhere
## Documentation
- Class name: `Seed Everywhere`
- Category: `everywhere`
- Output node: `True`

The Seed Everywhere node is designed to propagate a given seed value throughout the system, ensuring consistent and reproducible results across different components or executions. It emphasizes the importance of seed management in maintaining the determinism of operations.
## Input types
### Required
- **`seed`**
    - The seed parameter is crucial for initializing random number generators or other stochastic processes in a deterministic manner, ensuring that the same input leads to the same output across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`int`**
    - Comfy dtype: `INT`
    - Returns the same seed value that was input, allowing it to be used or propagated further.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [CR Module Pipe Loader](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Module Pipe Loader.md)
    - [Text Random Line](../../was-node-suite-comfyui/Nodes/Text Random Line.md)
    - [Anything Everywhere](../../cg-use-everywhere/Nodes/Anything Everywhere.md)
    - [CR Random Hex Color](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Random Hex Color.md)
    - [CR Random Multiline Values](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Random Multiline Values.md)
    - [SeargeSDXLSamplerV3](../../SeargeSDXL/Nodes/SeargeSDXLSamplerV3.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - Preset_Model_Merge



## Source code
```python
class SeedEverywhere(Base):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{ "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}) },
                 "hidden": {"id":"UNIQUE_ID"} }

    RETURN_TYPES = ("INT",)

    def func(self, seed, id):
        message(id, seed)
        return (seed,)

```
