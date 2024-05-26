# Documentation
- Class name: WAS_Latent_Batch
- Category: WAS Suite/Latent
- Output node: False
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

WAS_Latent_Batch节点旨在将多个潜在张量组合在一起，确保它们具有相同的维度。它在管理和组织潜在空间表示方面发挥着关键作用，使得在各种应用中高效处理潜在数据成为可能。

# Input types
## Optional
- latent_a
    - 参数'latent_a'是一个可选输入，代表一个潜在张量。它对于节点正确运行很重要，因为它有助于潜在表示的批量处理。参数的存在影响节点处理和生成一致潜在批量的能力。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, None]
- latent_b
    - 参数'latent_b'的作用与'latent_a'类似，允许在批量中包含另一个潜在张量。它增强了节点处理多种潜在向量的能力，这对于全面潜在空间分析至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, None]
- latent_c
    - 参数'latent_c'是另一个可选的潜在张量，可以包含在批量中。它的包含为节点提供了额外的灵活性，以适应不同的潜在结构，这对于复杂的潜在空间操作至关重要。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, None]
- latent_d
    - 参数'latent_d'为节点提供了进一步的灵活性，以在批量中处理更多的潜在张量。当需要一起处理更多的潜在表示时，它特别有用。
    - Comfy dtype: LATENT
    - Python dtype: Union[torch.Tensor, None]

# Output types
- latent
    - 输出'latent'是一个批量张量，将所有输入的潜在张量整合成单一结构。它很重要，因为它允许对组合的潜在表示进行流线型处理和分析。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: CPU

# Source code
```
class WAS_Latent_Batch:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {}, 'optional': {'latent_a': ('LATENT',), 'latent_b': ('LATENT',), 'latent_c': ('LATENT',), 'latent_d': ('LATENT',)}}
    RETURN_TYPES = ('LATENT',)
    RETURN_NAMES = ('latent',)
    FUNCTION = 'latent_batch'
    CATEGORY = 'WAS Suite/Latent'

    def _check_latent_dimensions(self, tensors, names):
        dimensions = [tensor['samples'].shape for tensor in tensors]
        if len(set(dimensions)) > 1:
            mismatched_indices = [i for (i, dim) in enumerate(dimensions) if dim[1] != dimensions[0][1]]
            mismatched_latents = [names[i] for i in mismatched_indices]
            if mismatched_latents:
                raise ValueError(f'WAS latent Batch Warning: Input latent dimensions do not match for latents: {mismatched_latents}')

    def latent_batch(self, **kwargs):
        batched_tensors = [kwargs[key] for key in kwargs if kwargs[key] is not None]
        latent_names = [key for key in kwargs if kwargs[key] is not None]
        if not batched_tensors:
            raise ValueError('At least one input latent must be provided.')
        self._check_latent_dimensions(batched_tensors, latent_names)
        samples_out = {}
        samples_out['samples'] = torch.cat([tensor['samples'] for tensor in batched_tensors], dim=0)
        samples_out['batch_index'] = []
        for tensor in batched_tensors:
            cindex = tensor.get('batch_index', list(range(tensor['samples'].shape[0])))
            samples_out['batch_index'] += cindex
        return (samples_out,)
```