# Documentation
- Class name: ReencodeLatentPipe
- Category: ImpactPack/Util
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Impact-Pack.git

ReencodeLatentPipe 是一个用于促进潜在空间表示转换的节点。它通过使用一对变分自编码器（VAE）重新编码潜在空间中的样本来操作。此节点对于需要在不同VAE模型之间操作或比较潜在表示的任务至关重要。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它表示需要重新编码的潜在空间数据。它是节点的主要输入，并直接影响节点的处理和输出。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- tile_mode
    - “tile_mode”参数在重新编码过程中决定了像素平铺的处理方式。它对于控制节点关于像素数据结构的行为至关重要。
    - Comfy dtype: COMBO['None', 'Both', 'Decode(input) only', 'Encode(output) only']
    - Python dtype: str
- input_basic_pipe
    - “input_basic_pipe”参数是一个复合输入，包括用于解码潜在样本的初始VAE模型。它在重新编码过程的初始阶段扮演重要角色。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]
- output_basic_pipe
    - “output_basic_pipe”参数包括负责编码重新编码的潜在样本的最终VAE模型。它是节点最终输出生成的关键组成部分。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: Tuple[Any, ...]

# Output types
- latent_samples
    - “latent_samples”输出代表重新编码后的潜在空间数据。它是节点操作的结果，对于后续任务中的进一步分析或处理具有重要意义。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class ReencodeLatentPipe:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'tile_mode': (['None', 'Both', 'Decode(input) only', 'Encode(output) only'],), 'input_basic_pipe': ('BASIC_PIPE',), 'output_basic_pipe': ('BASIC_PIPE',)}}
    CATEGORY = 'ImpactPack/Util'
    RETURN_TYPES = ('LATENT',)
    FUNCTION = 'doit'

    def doit(self, samples, tile_mode, input_basic_pipe, output_basic_pipe):
        (_, _, input_vae, _, _) = input_basic_pipe
        (_, _, output_vae, _, _) = output_basic_pipe
        return ReencodeLatent().doit(samples, tile_mode, input_vae, output_vae)
```