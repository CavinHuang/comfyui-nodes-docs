# Documentation
- Class name: NoisyLatentImage
- Category: latent/noise
- Output node: False
- Repo Ref: https://github.com/BlenderNeko/ComfyUI_Noise.git

该节点生成嘈杂的潜在变量，这对于各种生成模型产生图像至关重要。它在潜在空间中引入噪声，有助于从训练好的模型中创建多样化的输出。该节点的设计确保噪声是按程序生成的，并且能够适应不同模型的需求。

# Input types
## Required
- source
    - source参数决定计算是在CPU还是GPU上执行。这个选择显著影响节点的性能，GPU能够加快涉及大量数据和复杂计算任务的执行速度。
    - Comfy dtype: COMBO[('CPU', 'GPU'),]
    - Python dtype: str
- seed
    - seed参数对于噪声生成过程的可重复性至关重要。它确保每次执行节点时使用同一套随机数，从而得到一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
- width
    - width参数指定生成图像的期望宽度。它影响分辨率，进而影响生成过程中的细节级别和所需的计算资源。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - height参数设置要生成图像的高度。与宽度类似，它影响分辨率和计算需求，更高的值会导致更详细的图像和增加的处理需求。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 批处理大小决定了并行处理的图像数量。增加批处理大小可以提高效率，但需要更多的内存和计算资源。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- samples
    - samples输出包含生成的嘈杂潜在变量，它们作为后续生成模型的输入。这些潜在变量是创建多样化输出范围的基础，它们的质量和特征对最终结果至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class NoisyLatentImage:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'source': (['CPU', 'GPU'],), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'width': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'height': ('INT', {'default': 512, 'min': 64, 'max': MAX_RESOLUTION, 'step': 8}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'create_noisy_latents'
    CATEGORY = 'latent/noise'

    def create_noisy_latents(self, source, seed, width, height, batch_size):
        torch.manual_seed(seed)
        if source == 'CPU':
            device = 'cpu'
        else:
            device = comfy.model_management.get_torch_device()
        noise = torch.randn((batch_size, 4, height // 8, width // 8), dtype=torch.float32, device=device).cpu()
        return ({'samples': noise},)
```