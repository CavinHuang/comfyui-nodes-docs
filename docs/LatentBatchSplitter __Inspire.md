
# Documentation
- Class name: LatentBatchSplitter __Inspire
- Category: InspirePack/Util
- Output node: False

LatentBatchSplitter节点旨在将一批潜在表示拆分成更小的批次或单个样本，基于指定的数量。这一功能对于管理和操作数据批次至关重要，特别是在需要对大批次中的较小子集或单个项目进行操作的场景中。

# Input types
## Required
- latent
    - latent参数代表要拆分的潜在表示批次。它对确定输出批次的结构和内容至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- split_count
    - split_count参数指定从输入批次中提取的拆分数量或单个样本数量。它影响拆分操作的粒度，允许灵活调整批次大小。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 输出是一个元组，包含根据指定的拆分数量从原始输入批次中派生出的较小批次或单个潜在表示。
    - Comfy dtype: LATENT
    - Python dtype: Tuple[Dict[str, torch.Tensor]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LatentBatchSplitter:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "latent": ("LATENT",),
                    "split_count": ("INT", {"default": 4, "min": 0, "max": 50, "step": 1}),
                    },
                }

    RETURN_TYPES = ByPassTypeTuple(("LATENT", ))
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Util"

    def doit(self, latent, split_count):
        samples = latent['samples']

        latent_base = latent.copy()
        del latent_base['samples']

        cnt = min(split_count, len(samples))
        res = []

        for single_samples in samples[:cnt]:
            item = latent_base.copy()
            item['samples'] = single_samples.unsqueeze(0)
            res.append(item)

        if split_count >= len(samples):
            lack_cnt = split_count - cnt + 1  # including remained
            item = latent_base.copy()
            item['samples'] = empty_latent()

            for x in range(0, lack_cnt):
                res.append(item)

        elif cnt < len(samples):
            remained_cnt = len(samples) - cnt
            remained_latent = latent_base.copy()
            remained_latent['samples'] = samples[-remained_cnt:]
            res.append(remained_latent)

        return tuple(res)

```
