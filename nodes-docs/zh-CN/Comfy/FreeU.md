# Documentation
- Class name: FreeU
- Category: model_patches
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FreeU节点旨在通过对其输出块应用补丁来修改给定模型的行为。它调整模型中间表示的规模和偏移参数，增强模型在特定任务上的性能。

# Input types
## Required
- model
    - 模型参数至关重要，因为它定义了FreeU节点将应用其补丁的基础模型。这是节点操作的主要输入，以实现所需的修改。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- b1
    - b1参数是一个缩放因子，影响模型通道的前一半。它在节点调整模型输出的能力中起着关键作用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b2
    - b2参数是另一个缩放因子，影响模型通道的第二季度。它有助于微调模型的行为。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s1
    - s1参数定义了在缩放后应用于模型通道前一半的偏移量。它是节点修改模型输出功能的核心部分。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s2
    - s2参数指定了模型通道第二季度的偏移量，进一步定制模型的输出以满足特定要求。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- modified_model
    - modified_model输出是将FreeU节点的补丁应用于输入模型的结果。它代表了具有调整参数的增强模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class FreeU:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'b1': ('FLOAT', {'default': 1.1, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'b2': ('FLOAT', {'default': 1.2, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 's1': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 's2': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
    RETURN_TYPES = ('MODEL',)
    FUNCTION = 'patch'
    CATEGORY = 'model_patches'

    def patch(self, model, b1, b2, s1, s2):
        model_channels = model.model.model_config.unet_config['model_channels']
        scale_dict = {model_channels * 4: (b1, s1), model_channels * 2: (b2, s2)}
        on_cpu_devices = {}

        def output_block_patch(h, hsp, transformer_options):
            scale = scale_dict.get(h.shape[1], None)
            if scale is not None:
                h[:, :h.shape[1] // 2] = h[:, :h.shape[1] // 2] * scale[0]
                if hsp.device not in on_cpu_devices:
                    try:
                        hsp = Fourier_filter(hsp, threshold=1, scale=scale[1])
                    except:
                        logging.warning('Device {} does not support the torch.fft functions used in the FreeU node, switching to CPU.'.format(hsp.device))
                        on_cpu_devices[hsp.device] = True
                        hsp = Fourier_filter(hsp.cpu(), threshold=1, scale=scale[1]).to(hsp.device)
                else:
                    hsp = Fourier_filter(hsp.cpu(), threshold=1, scale=scale[1]).to(hsp.device)
            return (h, hsp)
        m = model.clone()
        m.set_model_output_block_patch(output_block_patch)
        return (m,)
```