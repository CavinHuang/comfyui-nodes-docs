
# Documentation
- Class name: Seed Generator
- Category: ImageSaverTools/utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Seed Generator节点旨在为图像保存过程中的各种操作提供确定性或随机化的种子值。它确保操作可以使用固定种子重复进行，或使用随机种子产生变化，从而支持输出的一致性和多样性。

# Input types
## Required
- seed
    - seed参数允许用户指定一个种子值，以生成确定性的输出。如果未提供，则使用默认值，确保操作的可重复性或随机性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- int
    - 输出一个整数，代表种子值，可用于初始化随机数生成器或其他需要种子的过程。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [UltimateSDUpscaleNoUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscaleNoUpscale.md)
    - Reroute
    - KSamplerAdvanced //Inspire
    - [DetailerForEach](../../ComfyUI-Impact-Pack/Nodes/DetailerForEach.md)



## Source code
```python
class SeedGenerator:
    RETURN_TYPES = ("INT",)
    FUNCTION = "get_seed"
    CATEGORY = "ImageSaverTools/utils"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff})}}

    def get_seed(self, seed):
        return (seed,)

```
