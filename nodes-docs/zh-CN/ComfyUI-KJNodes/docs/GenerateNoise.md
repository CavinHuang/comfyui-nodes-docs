
# Documentation
- Class name: GenerateNoise
- Category: KJNodes/noise
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

GenerateNoise节点用于创建合成噪声数据。它可以根据指定的尺寸、种子和缩放因子生成噪声模式，并提供归一化选项和跨批次生成恒定噪声的功能。这一功能对于需要将噪声注入潜在空间的任务或作为生成模型的基础至关重要，其中噪声充当进一步转换的种子。

# Input types
## Required
- width
    - 决定生成的噪声模式的宽度，影响输出的空间维度。
    - Comfy dtype: INT
    - Python dtype: int
- height
    - 设置生成的噪声模式的高度，影响噪声输出的空间维度。
    - Comfy dtype: INT
    - Python dtype: int
- batch_size
    - 指定要生成的噪声样本数量，允许批量处理噪声生成。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 随机数生成器的种子值，确保噪声模式的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
- multiplier
    - 应用于噪声的缩放因子，调整其强度或幅度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- constant_batch_noise
    - 布尔标志，当为真时，使整个批次使用相同的噪声模式，增强生成样本的一致性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- normalize
    - 启用时，将噪声模式归一化为标准差为1，标准化输出。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
## Optional
- model
    - 模型参数是可选的，允许根据模型的特征调整噪声生成，特别是在提供sigma值时。
    - Comfy dtype: MODEL
    - Python dtype: object
- sigmas
    - 可选参数，当提供时，根据sigma值调整噪声强度，这对特定的生成任务可能至关重要。
    - Comfy dtype: SIGMAS
    - Python dtype: List[float]

# Output types
- latent
    - 输出一个包含生成的噪声模式的字典，可用于进一步处理或作为生成模型的输入。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GenerateNoise:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": { 
            "width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
            "height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
            "batch_size": ("INT", {"default": 1, "min": 1, "max": 4096}),
            "seed": ("INT", {"default": 123,"min": 0, "max": 0xffffffffffffffff, "step": 1}),
            "multiplier": ("FLOAT", {"default": 1.0,"min": 0.0, "max": 4096, "step": 0.01}),
            "constant_batch_noise": ("BOOLEAN", {"default": False}),
            "normalize": ("BOOLEAN", {"default": False}),
            },
            "optional": {
            "model": ("MODEL", ),
            "sigmas": ("SIGMAS", ),
            }
            }
    
    RETURN_TYPES = ("LATENT",)
    FUNCTION = "generatenoise"
    CATEGORY = "KJNodes/noise"
    DESCRIPTION = """
Generates noise for injection or to be used as empty latents on samplers with add_noise off.
"""
        
    def generatenoise(self, batch_size, width, height, seed, multiplier, constant_batch_noise, normalize, sigmas=None, model=None):

        generator = torch.manual_seed(seed)
        noise = torch.randn([batch_size, 4, height // 8, width // 8], dtype=torch.float32, layout=torch.strided, generator=generator, device="cpu")
        if sigmas is not None:
            sigma = sigmas[0] - sigmas[-1]
            sigma /= model.model.latent_format.scale_factor
            noise *= sigma

        noise *=multiplier

        if normalize:
            noise = noise / noise.std()
        if constant_batch_noise:
            noise = noise[0].repeat(batch_size, 1, 1, 1)
        return ({"samples":noise}, )

```
