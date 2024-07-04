
# Documentation
- Class name: KSamplerPipe __Inspire
- Category: InspirePack/a1111_compat
- Output node: False

KSamplerPipe节点旨在通过专门的采样过程促进灵感内容的生成。它整合了先进的采样技术来产生创新和新颖的输出，利用Inspire Pack的功能来增强创作过程。

# Input types
## Required
- basic_pipe
    - 代表采样过程所需的基本组件，包括生成输出所需的模型和配置。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple
- seed
    - 指定采样过程的种子，确保可重复性和对生成过程的控制。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 决定采样过程的步骤数，影响生成的深度和细节。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - 配置条件因子，影响生成内容的创造性和连贯性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - 选择要使用的特定采样器，定制采样过程以实现所需效果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- scheduler
    - 选择控制采样过程的调度器，优化生成流程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- latent_image
    - 提供初始潜在图像作为采样过程的起点，实现更有针对性和特定的内容生成。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- denoise
    - 调整应用于输出的去噪水平，平衡清晰度和创意失真之间的关系。
    - Comfy dtype: FLOAT
    - Python dtype: float
- noise_mode
    - 指定噪声应用模式，影响生成内容的纹理和整体外观。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- batch_seed_mode
    - 定义批处理的种子模式，确保生成输出的一致性和可变性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- variation_seed
    - 用于引入变化的可选种子，增强生成内容的多样性。
    - Comfy dtype: INT
    - Python dtype: int
- variation_strength
    - 决定引入变化的强度，允许在输出中进行从细微到显著的改变。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- latent
    - 生成内容的潜在表示，封装了创意精髓和进一步处理的潜力。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- vae
    - 过程中使用的变分自动编码器，对生成内容的转换和优化至关重要。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class KSampler_inspire_pipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"basic_pipe": ("BASIC_PIPE",),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 8.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS, ),
                     "scheduler": (common.SCHEDULERS, ),
                     "latent_image": ("LATENT", ),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "noise_mode": (["GPU(=A1111)", "CPU"],),
                     "batch_seed_mode": (["incremental", "comfy", "variation str inc:0.01", "variation str inc:0.05"],),
                     "variation_seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "variation_strength": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     }
                }

    RETURN_TYPES = ("LATENT", "VAE")
    FUNCTION = "sample"

    CATEGORY = "InspirePack/a1111_compat"

    def sample(self, basic_pipe, seed, steps, cfg, sampler_name, scheduler, latent_image, denoise, noise_mode, batch_seed_mode="comfy", variation_seed=None, variation_strength=None):
        model, clip, vae, positive, negative = basic_pipe
        latent = common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, noise_mode, incremental_seed_mode=batch_seed_mode, variation_seed=variation_seed, variation_strength=variation_strength)[0]
        return (latent, vae)

```
