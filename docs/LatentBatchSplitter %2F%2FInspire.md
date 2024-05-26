# Documentation
- Class name: LatentBatchSplitter
- Category: InspirePack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在将一批潜在表示分割成多个子集，以便于数据处理和模型训练中的多样化应用。它通过使单一输入生成多样化的数据集，增强了潜在空间探索的灵活性，这对于生成多样化输出或以受控方式扩充数据集等任务至关重要。

# Input types
## Required
- latent
    - ‘latent’参数至关重要，因为它提供了将由节点处理的初始潜在表示批次。它是所有后续操作的基础，使节点能够执行其预期功能，即分割和重组数据。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- split_count
    - ‘split_count’参数规定了将潜在批次划分为所需子集的数量。它在确定输出的粒度方面起着关键作用，并且可以显著影响生成数据集的多样性和分布。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - 输出‘latent’代表重新组织的潜在表示批次，现在结构化为指定数量的子集。这个输出对于依赖分区数据的下游过程至关重要，如模型训练或多样化内容的生成。
    - Comfy dtype: LATENT
    - Python dtype: List[Dict[str, torch.Tensor]]

# Usage tips
- Infra type: CPU

# Source code
```
class LatentBatchSplitter:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latent': ('LATENT',), 'split_count': ('INT', {'default': 4, 'min': 0, 'max': 50, 'step': 1})}}
    RETURN_TYPES = ByPassTypeTuple(('LATENT',))
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Util'

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
            lack_cnt = split_count - cnt + 1
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