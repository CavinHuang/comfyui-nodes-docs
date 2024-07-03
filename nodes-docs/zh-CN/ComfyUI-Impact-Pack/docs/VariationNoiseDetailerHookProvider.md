
# Documentation
- Class name: VariationNoiseDetailerHookProvider
- Category: ImpactPack/Detailer
- Output node: False

VariationNoiseDetailerHookProvider节点提供了一种机制，用于在细节增强过程中引入噪声变化，通过指定的种子和强度生成修改后的噪声模式。它旨在通过将原始噪声与变化诱导的噪声混合，来丰富生成图像或图像片段的纹理细节和可变性。

# Input types
## Required
- seed
    - seed参数对于生成变化诱导的噪声至关重要，它确保了在不同执行过程中噪声模式的可重复性和一致性。
    - Comfy dtype: INT
    - Python dtype: int
- strength
    - strength参数决定了变化诱导噪声对最终噪声输出的影响程度，允许对引入的纹理变化进行精细控制。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- detailer_hook
    - 输出一个配置有变化诱导噪声的细节增强钩子，可用于增强生成图像或图像片段的细节。
    - Comfy dtype: DETAILER_HOOK
    - Python dtype: DetailerHook


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class VariationNoiseDetailerHookProvider:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01})}
                }

    RETURN_TYPES = ("DETAILER_HOOK",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/Detailer"

    def doit(self, seed, strength):
        hook = hooks.VariationNoiseDetailerHookProvider(seed, strength)
        return (hook, )

```
