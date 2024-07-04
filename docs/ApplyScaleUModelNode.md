
# Documentation
- Class name: ApplyScaleUModelNode
- Category: instance
- Output node: False

此节点旨在通过应用ScaleU补丁来增强给定模型的功能,该补丁基于ScaleU技术调整模型的输出。这项技术涉及修改模型的内部处理以纳入额外的缩放调整,目的是改善模型的性能或输出质量。

# Input types
## Required
- model
    - 将应用ScaleU补丁的模型。此参数至关重要,因为它决定了将使用ScaleU技术增强的基础模型,影响节点的整体执行和结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- scaleu
    - 要应用于模型的ScaleU配置。此参数对于定义将对模型进行的具体缩放调整和增强至关重要,影响其性能和输出特征。
    - Comfy dtype: SCALEU
    - Python dtype: Dict[str, Any]

# Output types
- model
    - 应用了ScaleU补丁的增强模型。此输出反映了对原始模型所做的修改,展示了应用ScaleU技术后的改进或调整结果。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ApplyScaleUModelNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model": ("MODEL",),
            "scaleu": ("SCALEU",),
        }}

    RETURN_TYPES = ("MODEL",)
    FUNCTION = "apply"

    CATEGORY = "instance"

    def apply(self, model, scaleu):
        # Validate patches dict is setup correctly
        transformer_options = model.model_options['transformer_options']
        if 'patches' not in transformer_options:
            transformer_options['patches'] = {}

        if 'output_block_patch' not in transformer_options['patches']:
            transformer_options['patches']['output_block_patch'] = []

        # Add scaleu patch to model patches
        scaleu_nets = scaleu['model_list']
        # TODO make this load in KSampler
        for i, scaleu in enumerate(scaleu_nets):
            scaleu_nets[i] = scaleu.to(
                comfy.model_management.get_torch_device())
        transformer_options['patches']['output_block_patch'].append(
            get_scaleu_patch(scaleu_nets))
        return (model,)

```
