
# Documentation
- Class name: ChangeLatentBatchSize __Inspire
- Category: InspirePack/Util
- Output node: False

这个节点旨在修改给定潜在表示的批次大小。它通过根据指定的新批次大小和模式调整与潜在样本相关的张量来实现这一目标，确保在适应新的批次大小要求的同时保持潜在表示的结构。

# Input types
## Required
- latent
    - 需要调整大小的潜在表示。对于在调整批次大小的同时保持数据完整性至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- batch_size
    - 指定潜在表示的目标批次大小，直接影响调整大小操作。
    - Comfy dtype: INT
    - Python dtype: int
- mode
    - 决定调整大小的方法，为如何执行批次大小调整提供灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- latent
    - 调整大小后的潜在表示，现在符合指定的批次大小。
    - Comfy dtype: LATENT
    - Python dtype: Tuple[Dict[str, torch.Tensor]]


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ChangeLatentBatchSize:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                                "latent": ("LATENT",),
                                "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096, "step": 1}),
                                "mode": (["simple"],)
                            }
                }

    CATEGORY = "InspirePack/Util"

    RETURN_TYPES = ("LATENT", )
    FUNCTION = "doit"

    @staticmethod
    def doit(latent, batch_size, mode):
        res_latent = latent.copy()
        samples = res_latent['samples']
        samples = ChangeImageBatchSize.resize_tensor(samples, batch_size, mode)
        res_latent['samples'] = samples
        return (res_latent,)

```
