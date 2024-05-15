# Documentation
- Class name: ModelSamplingStableCascade
- Category: advanced/model
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ModelSamplingStableCascade节点旨在通过集成稳定级联方法来增强生成模型的采样过程。它允许用户通过'patch'方法定制采样过程，修改模型行为以适应高级采样技术。对于希望实现可能提高生成输出质量和多样性的复杂采样策略的用户来说，此节点至关重要。

# Input types
## Required
- model
    - ‘model’参数至关重要，因为它代表了将被节点修改的生成模型。它是应用高级采样技术的基础，直接影响节点的执行和生成输出的质量。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- shift
    - ‘shift’参数在控制级联模型中的采样方差中起着关键作用。它调整采样分布以实现生成图像中的不同细节或多样性水平，从而显著影响节点的结果。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- modified_model
    - ‘modified_model’输出代表了已经通过稳定级联采样技术增强的生成模型。它很重要，因为它包含了节点的修改，并且用于进一步处理或直接生成高质量的图像。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class ModelSamplingStableCascade:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'shift': ('FLOAT', {'default': 2.0, 'min': 0.0, 'max': 100.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'advanced/model'

    def patch(self, model, shift):
        m = model.clone()
        sampling_base = comfy.model_sampling.StableCascadeSampling
        sampling_type = comfy.model_sampling.EPS

        class ModelSamplingAdvanced(sampling_base, sampling_type):
            pass
        model_sampling = ModelSamplingAdvanced(model.model.model_config)
        model_sampling.set_parameters(shift)
        m.add_object_patch('model_sampling', model_sampling)
        return (m,)
```