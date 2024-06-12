# Documentation
- Class name: InstructPixToPixConditioning
- Category: conditioning/instructpix2pix
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

InstructPixToPixConditioning节点旨在通过将图像数据编码成潜在表示来处理图像数据，以便用于进一步的操纵或分析。它在将原始像素数据转换为更有利于条件图像生成任务的形式中扮演着关键角色。

# Input types
## Required
- positive
    - 正面条件参数对节点的操作至关重要，因为它提供了正面示例或期望的结果，指导编码过程。它影响潜在空间转换的方向。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- negative
    - 负面条件参数作为正面条件的对立面，提供了在编码过程中应避免或最小化的示例。它有助于细化节点的输出，以符合期望的结果。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- pixels
    - 像素参数是节点的核心输入，代表需要编码的原始图像数据。其质量和格式直接影响编码过程的准确性和有效性。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- vae
    - vae参数是节点的关键组成部分，它代表用于将像素数据编码到潜在空间的变分自编码器模型。VAE模型的选择和配置显著影响节点的性能。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module

# Output types
- positive
    - 正面输出代表基于提供的正面示例进行编码的条件数据。它是依赖正面指导的后续图像生成或操作过程的关键组成部分。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- negative
    - 负面输出对应于基于负面示例进行编码的条件数据。它在确保生成的图像避免不希望的特征方面起着至关重要的作用。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[Tuple[str, Dict[str, Any]]]
- latent
    - 潜在输出是输入像素数据的编码表示。它作为进一步图像处理任务的基础，以简化形式捕获基本特征。
    - Comfy dtype: LATENT
    - Python dtype: Dict[str, torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class InstructPixToPixConditioning:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'vae': ('VAE',), 'pixels': ('IMAGE',)}}
    RETURN_TYPES = ('CONDITIONING', 'CONDITIONING', 'LATENT')
    RETURN_NAMES = ('positive', 'negative', 'latent')
    FUNCTION = 'encode'
    CATEGORY = 'conditioning/instructpix2pix'

    def encode(self, positive, negative, pixels, vae):
        x = pixels.shape[1] // 8 * 8
        y = pixels.shape[2] // 8 * 8
        if pixels.shape[1] != x or pixels.shape[2] != y:
            x_offset = pixels.shape[1] % 8 // 2
            y_offset = pixels.shape[2] % 8 // 2
            pixels = pixels[:, x_offset:x + x_offset, y_offset:y + y_offset, :]
        concat_latent = vae.encode(pixels)
        out_latent = {}
        out_latent['samples'] = torch.zeros_like(concat_latent)
        out = []
        for conditioning in [positive, negative]:
            c = []
            for t in conditioning:
                d = t[1].copy()
                d['concat_latent_image'] = concat_latent
                n = [t[0], d]
                c.append(n)
            out.append(c)
        return (out[0], out[1], out_latent)
```