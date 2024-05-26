# Documentation
- Class name: ReferenceOnlySimple
- Category: custom_node_experiments
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI_experiments

在`ReferenceOnlySimple`节点中的`reference_only`方法旨在通过整合参考结构来增强给定的模型。它通过克隆输入模型并对其注意力机制应用自定义的参考应用函数来操作，允许集成额外的潜在样本。这种方法特别适用于涉及模型适应和潜在空间操作的实验。

# Input types
## Required
- model
    - ‘model’参数至关重要，因为它代表了将由节点增强的机器学习模型。它是主要的输入，决定了节点内应用的后续操作和转换。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- reference
    - ‘reference’参数是一个关键输入，它提供了要与模型集成的潜在空间样本。它通过影响潜在空间的结构和内容，在节点的功能中起着重要作用。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
## Optional
- batch_size
    - ‘batch_size’参数决定了模型操作中使用的批次大小。它影响节点的效率和内存使用情况，允许根据手头任务的具体要求进行定制。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model_reference
    - ‘model_reference’输出是已通过参考结构增强的修改后的模型。它是节点操作的直接结果，可供进一步使用或评估。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- latent
    - ‘latent’输出包含来自参考和节点新生成的潜在空间样本的组合。它标志着节点操作和扩展潜在空间的能力。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class ReferenceOnlySimple:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'reference': ('LATENT',), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('MODEL', 'LATENT')
    FUNCTION = 'reference_only'
    CATEGORY = 'custom_node_experiments'

    def reference_only(self, model, reference, batch_size):
        model_reference = model.clone()
        size_latent = list(reference['samples'].shape)
        size_latent[0] = batch_size
        latent = {}
        latent['samples'] = torch.zeros(size_latent)
        batch = latent['samples'].shape[0] + reference['samples'].shape[0]

        def reference_apply(q, k, v, extra_options):
            k = k.clone().repeat(1, 2, 1)
            offset = 0
            if q.shape[0] > batch:
                offset = batch
            for o in range(0, q.shape[0], batch):
                for x in range(1, batch):
                    k[x + o, q.shape[1]:] = q[o, :]
            return (q, k, k)
        model_reference.set_model_attn1_patch(reference_apply)
        out_latent = torch.cat((reference['samples'], latent['samples']))
        if 'noise_mask' in latent:
            mask = latent['noise_mask']
        else:
            mask = torch.ones((64, 64), dtype=torch.float32, device='cpu')
        if len(mask.shape) < 3:
            mask = mask.unsqueeze(0)
        if mask.shape[0] < latent['samples'].shape[0]:
            print(latent['samples'].shape, mask.shape)
            mask = mask.repeat(latent['samples'].shape[0], 1, 1)
        out_mask = torch.zeros((1, mask.shape[1], mask.shape[2]), dtype=torch.float32, device='cpu')
        return (model_reference, {'samples': out_latent, 'noise_mask': torch.cat((out_mask, mask))})
```