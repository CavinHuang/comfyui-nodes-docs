# Documentation
- Class name: FreeU_V2
- Category: model_patches
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

FreeU_V2节点旨在通过应用一个补丁来增强给定模型的功能，该补丁修改了模型的输出块。它通过以对通道维度敏感的方式缩放和过滤模型的隐藏状态来实现这一点，从而可能改善模型的性能或输出特性。

# Input types
## Required
- model
    - 模型参数是必需的，因为它代表了FreeU_V2节点将要修改的基础模型。节点的功能围绕改变模型的行为展开，使这个参数成为节点执行的关键。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- b1
    - b1参数是应用于模型中某些隐藏状态的缩放因子。它在确定节点应用的修改程度方面起着重要作用，影响模型的最终输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- b2
    - b2参数是另一个缩放因子，应用于不同的隐藏状态集。它有助于整体修改过程，对微调模型的输出很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s1
    - s1参数定义了应用于模型隐藏状态的傅里叶滤波过程的缩放因子。它对于控制模型输出中保留的频率分量很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float
- s2
    - s2参数是与傅里叶滤波过程一起使用的另一个缩放因子，用于不同的隐藏状态子集。它对于调整节点对模型输出的影响很重要。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- model
    - FreeU_V2节点的输出是修改后的模型，现在包含了应用的补丁。这个修改后的模型预计将与原始模型产生不同的输出，可能提供改进的性能或特性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class FreeU_V2:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'b1': ('FLOAT', {'default': 1.3, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 'b2': ('FLOAT', {'default': 1.4, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 's1': ('FLOAT', {'default': 0.9, 'min': 0.0, 'max': 10.0, 'step': 0.01}), 's2': ('FLOAT', {'default': 0.2, 'min': 0.0, 'max': 10.0, 'step': 0.01})}}
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
                hidden_mean = h.mean(1).unsqueeze(1)
                B = hidden_mean.shape[0]
                (hidden_max, _) = torch.max(hidden_mean.view(B, -1), dim=-1, keepdim=True)
                (hidden_min, _) = torch.min(hidden_mean.view(B, -1), dim=-1, keepdim=True)
                hidden_mean = (hidden_mean - hidden_min.unsqueeze(2).unsqueeze(3)) / (hidden_max - hidden_min).unsqueeze(2).unsqueeze(3)
                h[:, :h.shape[1] // 2] = h[:, :h.shape[1] // 2] * ((scale[0] - 1) * hidden_mean + 1)
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