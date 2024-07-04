
# Documentation
- Class name: InstructPixToPixConditioningAdvanced
- Category: conditioning/instructpix2pix
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

InstructPixToPixConditioningAdvanced节点是为Pix2Pix图像转换任务中的高级条件设置而设计的。它接收正面和负面的条件输入，以及新的和原始的潜在表示，以生成修改后的条件和潜在输出。该节点旨在通过允许将额外的潜在信息整合到条件设置过程中，来促进复杂的图像操作任务。

# Input types
## Required
- positive
    - 代表正面条件输入，用于引导图像转换过程朝着所需方向发展。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[CONDITIONING]
- negative
    - 代表负面条件输入，用于引导图像转换远离不希望的特征。
    - Comfy dtype: CONDITIONING
    - Python dtype: Tuple[CONDITIONING]
- new
    - 代表要整合到条件设置过程中的新潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: Dict with key 'samples' and value as a tensor
- original
    - 代表原始潜在表示，用于与新表示进行形状一致性比较，并整合到条件设置中。
    - Comfy dtype: LATENT
    - Python dtype: Dict with key 'samples' and value as a tensor

# Output types
- cond1
    - 修改后的正面条件输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING
- cond2
    - 修改后的负面条件输出。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING
- negative
    - 未修改的负面条件输入，为保持一致性而传递。
    - Comfy dtype: CONDITIONING
    - Python dtype: CONDITIONING
- latent
    - 新的潜在表示，其中的样本被整合到条件输出中。
    - Comfy dtype: LATENT
    - Python dtype: Dict with key 'samples' and value as a tensor


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class InstructPixToPixConditioningAdvanced:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"positive": ("CONDITIONING", ),
                             "negative": ("CONDITIONING", ),
                             "new": ("LATENT", ),
                             "original": ("LATENT", ),
                             }}

    RETURN_TYPES = ("CONDITIONING","CONDITIONING","CONDITIONING","LATENT")
    RETURN_NAMES = ("cond1", "cond2", "negative", "latent")
    FUNCTION = "encode"

    CATEGORY = "conditioning/instructpix2pix"

    def encode(self, positive, negative, new, original):
        new_shape, orig_shape = new["samples"].shape, original["samples"].shape
        if new_shape != orig_shape:
            raise Exception(f"Latent shape mismatch: {new_shape} and {orig_shape}")
        
        out_latent = {}
        out_latent["samples"] = new["samples"]
        out = []
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                d["concat_latent_image"] = original["samples"]
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1], negative, out_latent)

```
