# Documentation
- Class name: NNLatentUpscale
- Category: latent
- Output node: False
- Repo Ref: https://github.com/Ttl/ComfyUi_NNLatentUpscale

NNLatentUpscale是一个旨在通过神经网络提升低维潜在表示分辨率的类，提供了一种从压缩数据生成高保真图像的方法。

# Input types
## Required
- latent
    - latent参数至关重要，它代表了需要放大的数据的压缩形式，作为神经网络执行其增强的主要输入。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]
- version
    - version参数决定了用于放大过程的模型，确保神经网络操作的兼容性和准确性。
    - Comfy dtype: COMBO
    - Python dtype: Union[str, List[str]]
## Optional
- upscale
    - upscale参数微调应用于潜在数据的增强程度，影响最终输出的分辨率和质量。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- samples
    - 输出'samples'代表放大后的潜在表示，现在具有更高的分辨率，并准备进行进一步的处理或分析。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class NNLatentUpscale:
    """
    Upscales SDXL latent using neural network
    """

    def __init__(self):
        self.local_dir = os.path.dirname(os.path.realpath(__file__))
        self.scale_factor = 0.13025
        self.dtype = torch.float32
        if model_management.should_use_fp16():
            self.dtype = torch.float16
        self.weight_path = {'SDXL': os.path.join(self.local_dir, 'sdxl_resizer.pt'), 'SD 1.x': os.path.join(self.local_dir, 'sd15_resizer.pt')}
        self.version = 'none'

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'latent': ('LATENT',), 'version': (['SDXL', 'SD 1.x'],), 'upscale': ('FLOAT', {'default': 1.5, 'min': 1.0, 'max': 2.0, 'step': 0.01, 'display': 'number'})}}
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'upscale'
    CATEGORY = 'latent'

    def upscale(self, latent, version, upscale):
        device = model_management.get_torch_device()
        samples = latent['samples'].to(device=device, dtype=self.dtype)
        if version != self.version:
            self.model = LatentResizer.load_model(self.weight_path[version], device, self.dtype)
            self.version = version
        self.model.to(device=device)
        latent_out = self.model(self.scale_factor * samples, scale=upscale) / self.scale_factor
        if self.dtype != torch.float32:
            latent_out = latent_out.to(dtype=torch.float32)
        latent_out = latent_out.to(device='cpu')
        self.model.to(device=model_management.vae_offload_device())
        return ({'samples': latent_out},)
```