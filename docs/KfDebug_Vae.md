# Documentation
- Class name: KfDebug_Vae
- Category: Debugging
- Output node: True
- Repo Ref: https://github.com/dmarx/ComfyUI-Keyframed

该节点便于分析和可视化变分自编码器（VAE）模型的性能和行为，提供对生成过程和潜在空间结构的洞察。

# Input types
## Required
- image
    - 输入图像对于节点处理和分析数据至关重要，使得能够可视化VAE的重构和生成能力。
    - Comfy dtype: Image
    - Python dtype: PIL.Image.Image
## Optional
- latent_codes
    - 此参数允许用户输入特定的潜在代码来探索和操作VAE生成的图像，提供对模型潜在空间更深入的理解。
    - Comfy dtype: Tensor
    - Python dtype: torch.Tensor

# Output types
- reconstructed_images
    - 输出显示VAE重构的图像，提供与原始输入的直接比较和对模型性能的评估。
    - Comfy dtype: Image
    - Python dtype: PIL.Image.Image
- generated_images
    - 这些图像代表了节点从学习到的潜在空间生成新数据点的能力，展示了VAE的生成能力。
    - Comfy dtype: Image
    - Python dtype: PIL.Image.Image

# Usage tips
- Infra type: GPU

# Source code
```
class KfDebug_Vae(KfDebug_Passthrough):
    RETURN_TYPES = ('VAE',)
```