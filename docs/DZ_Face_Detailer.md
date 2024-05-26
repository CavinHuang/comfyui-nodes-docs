# Documentation
- Class name: FaceDetailer
- Category: face_detailer
- Output node: False
- Repo Ref: https://github.com/friendlymilo/DZ-FaceDetailer.git

FaceDetailer是一个旨在通过使用先进的机器学习模型和图像处理技术来增强图像中面部特征的节点。它通过应用掩码和去噪操作来专注于细化面部的细节，旨在提高面部数据的质量和清晰度。

# Input types
## Required
- model
    - 模型参数对于FaceDetailer节点至关重要，因为它决定了用于面部细节增强的机器学习架构。这对于节点的正确功能和产生准确的面部特征增强至关重要。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- seed
    - 种子参数对于FaceDetailer节点很重要，因为它在面部特征增强过程中引入了随机性。它确保节点可以生成各种面部细节，有助于输出的多样性。
    - Comfy dtype: INT
    - Python dtype: int
- steps
    - 步骤参数影响FaceDetailer节点在面部增强过程中执行的迭代次数。它影响最终输出中实现的细节和精炼程度，更多的步骤可能导致更高质量的增强。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - cfg参数是一个配置值，用于调整面部特征增强过程的强度。它在确定节点输出方面起着重要作用，较高的值可能导致更明显的面部细节。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - sampler_name参数对于FaceDetailer节点至关重要，因为它选择了用于生成面部细节的采样方法。它影响面部特征的多样性和随机性，有助于节点输出的独特性。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - 调度器参数对于FaceDetailer节点至关重要，因为它管理着增强过程的流程。它影响节点随时间应用面部特征增强的方式，确保平滑高效的转换。
    - Comfy dtype: COMBO
    - Python dtype: str
- positive
    - 正面参数作为FaceDetailer节点确定哪些面部特征进行增强的指导。它在塑造最终输出方面起着关键作用，确保所需的特征得到强调和改进。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 负面参数被FaceDetailer节点用来识别应该减少或降低突出程度的面部特征。它通过确保不需要的特征被降低，从而有助于整体面部细节增强。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent_image
    - latent_image参数对于FaceDetailer节点至关重要，因为它提供了面部特征增强的初始数据。它是节点构建和细化面部细节的基础，直接影响输出的质量。
    - Comfy dtype: LATENT
    - Python dtype: dict
- denoise
    - 去噪参数对于FaceDetailer节点很重要，因为它控制了在面部增强过程中应用的降噪水平。它有助于实现更清晰、更精细的面部细节输出。
    - Comfy dtype: FLOAT
    - Python dtype: float
- vae
    - vae参数对于FaceDetailer节点至关重要，因为它代表了用于解码和生成面部图像的变分自编码器模型。它是节点能够产生高质量面部细节增强的关键组成部分。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- mask_blur
    - mask_blur参数对于FaceDetailer节点很重要，因为它决定了应用于面部掩码的模糊程度。它影响掩码的平滑度和精确度，进而影响面部细节增强的质量。
    - Comfy dtype: INT
    - Python dtype: int
- mask_type
    - mask_type参数对于FaceDetailer节点至关重要，因为它指定了用于面部特征增强的掩码类型。它直接影响面部细节增强过程的有效性和准确性。
    - Comfy dtype: MASK_TYPE
    - Python dtype: str
- mask_control
    - mask_control参数对于FaceDetailer节点至关重要，因为它管理着面部掩码的操作。它影响掩码的最终外观，进而影响面部特征增强的质量。
    - Comfy dtype: MASK_CONTROL
    - Python dtype: str
- dilate_mask_value
    - dilate_mask_value参数对于FaceDetailer节点很重要，因为它定义了应用于面部掩码的掩码膨胀程度。它影响掩码面部区域的大小和形状，这对于精确的面部特征增强至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- erode_mask_value
    - erode_mask_value参数对于FaceDetailer节点很重要，因为它设置了应用于面部掩码的掩码腐蚀程度。它影响掩码面部特征的定义和边界，有助于面部细节增强的准确性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- latent
    - latent参数代表FaceDetailer节点提取的精炼和增强的面部特征。这是一个关键的输出，封装了详细的面部信息，准备供进一步使用或分析。
    - Comfy dtype: LATENT
    - Python dtype: dict
- mask
    - mask参数是FaceDetailer节点的一个输出，提供了增强过程中使用的面部掩码。它是任何后续面部特征操作或分析的重要组件。
    - Comfy dtype: MASK
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class FaceDetailer:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'model': ('MODEL',), 'seed': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615}), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0, 'step': 0.1, 'round': 0.01}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent_image': ('LATENT',), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'latent_image': ('LATENT',), 'vae': ('VAE',), 'mask_blur': ('INT', {'default': 0, 'min': 0, 'max': 100}), 'mask_type': (MASK_TYPE,), 'mask_control': (MASK_CONTROL,), 'dilate_mask_value': ('INT', {'default': 3, 'min': 0, 'max': 100}), 'erode_mask_value': ('INT', {'default': 3, 'min': 0, 'max': 100})}}
    RETURN_TYPES = ('LATENT', 'MASK')
    FUNCTION = 'detailer'
    CATEGORY = 'face_detailer'

    def detailer(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image, denoise, vae, mask_blur, mask_type, mask_control, dilate_mask_value, erode_mask_value):
        tensor_img = vae.decode(latent_image['samples'])
        batch_size = tensor_img.shape[0]
        mask = Detection().detect_faces(tensor_img, batch_size, mask_type, mask_control, mask_blur, dilate_mask_value, erode_mask_value)
        latent_mask = set_mask(latent_image, mask)
        latent = nodes.common_ksampler(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_mask, denoise=denoise)
        return (latent[0], latent[0]['noise_mask'])
```