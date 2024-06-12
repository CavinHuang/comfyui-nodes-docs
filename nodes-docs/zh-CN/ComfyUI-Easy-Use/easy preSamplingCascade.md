# Documentation
- Class name: cascadeSettings
- Category: EasyUse/PreSampling
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

cascadeSettings节点旨在简化配置和管理生成模型流水线的设置过程。它封装了模型编码和解码的必要参数，以及采样策略，以便于创建高质量的视觉输出。该节点强调易用性和效率，允许用户专注于项目的创意方面，而不会被复杂的技术细节所困扰。

# Input types
## Required
- pipe
    - ‘pipe’参数至关重要，因为它携带了生成模型流水线的全部上下文，包括模型设置和数据样本。它对cascadeSettings节点的正确运行和生成过程的完整性至关重要。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- encode_vae_name
    - ‘encode_vae_name’参数指定了生成过程中使用的编码器VAE模型的名称。它对于设置潜在空间表示的基础很重要，直接影响生成图像的质量。
    - Comfy dtype: COMBO
    - Python dtype: Union[str, None]
- decode_vae_name
    - ‘decode_vae_name’参数决定了用于从潜在空间重构图像的解码器VAE模型。其选择影响最终输出的保真度和视觉一致性。
    - Comfy dtype: COMBO
    - Python dtype: Union[str, None]
- steps
    - ‘steps’参数定义了采样过程中的迭代次数或步骤数。它是控制生成图像细节和精炼程度的关键因素。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - ‘cfg’参数调整生成模型的配置，影响流水线的整体行为和性能。这是一个关键设置，可以显著改变最终结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- sampler_name
    - ‘sampler_name’参数选择用于生成图像的采样方法。它在决定视觉输出的多样性和独特性方面至关重要。
    - Comfy dtype: COMBO
    - Python dtype: str
- scheduler
    - ‘scheduler’参数管理采样计划，这对于平衡质量和计算效率之间的权衡至关重要。它在优化生成过程中起着重要作用。
    - Comfy dtype: COMBO
    - Python dtype: str
- denoise
    - ‘denoise’参数控制图像生成过程中应用的降噪水平。它影响最终图像的清晰度和平滑度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- seed
    - ‘seed’参数通过设置固定的随机种子来确保生成过程的可复现性。它对于在不同运行中获得一致的结果很重要。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- image_to_latent_c
    - ‘image_to_latent_c’参数允许输入一个将被编码到潜在空间的图像。这使得用户可以为生成过程指定一个起点，影响输出的方向和风格。
    - Comfy dtype: IMAGE
    - Python dtype: PIL.Image.Image
- latent_c
    - ‘latent_c’参数提供了潜在向量的直接输入，为用户提供了以更高精度控制生成过程的能力。这可以导致更细致和针对性的视觉输出。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
- prompt
    - ‘prompt’参数将文本指导引入生成过程，允许用户引导生成图像的内容和主题。它是实现特定创意愿景的重要工具。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数包含与输入图像相关的额外信息，可用于完善生成过程并提高输出与预期上下文的相关性。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]
- my_unique_id
    - ‘my_unique_id’参数用于跟踪和管理每个生成过程实例的唯一标识符。它对于保持多个并行或顺序操作的完整性和组织至关重要。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: Any

# Output types
- pipe_line
    - ‘pipe_line’输出是应用了所有设置的输入'pipe'的更新版本。它作为生成流水线后续阶段的基础，确保配置的参数在图像生成过程中被正确地传播和利用。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict

# Usage tips
- Infra type: CPU

# Source code
```
class cascadeSettings:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'encode_vae_name': (['None'] + folder_paths.get_filename_list('vae'),), 'decode_vae_name': (['None'] + folder_paths.get_filename_list('vae'),), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 4.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'euler_ancestral'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'simple'}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'optional': {'image_to_latent_c': ('IMAGE',), 'latent_c': ('LATENT',)}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE',)
    RETURN_NAMES = ('pipe',)
    OUTPUT_NODE = True
    FUNCTION = 'settings'
    CATEGORY = 'EasyUse/PreSampling'

    def settings(self, pipe, encode_vae_name, decode_vae_name, steps, cfg, sampler_name, scheduler, denoise, seed, model=None, image_to_latent_c=None, latent_c=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        (images, samples_c) = (None, None)
        samples = pipe['samples']
        batch_size = pipe['loader_settings']['batch_size'] if 'batch_size' in pipe['loader_settings'] else 1
        encode_vae_name = encode_vae_name if encode_vae_name is not None else pipe['loader_settings']['encode_vae_name']
        decode_vae_name = decode_vae_name if decode_vae_name is not None else pipe['loader_settings']['decode_vae_name']
        if image_to_latent_c is not None:
            if encode_vae_name != 'None':
                encode_vae = easyCache.load_vae(encode_vae_name)
            else:
                encode_vae = pipe['vae'][0]
            if 'compression' not in pipe['loader_settings']:
                raise Exception('compression is not found')
            compression = pipe['loader_settings']['compression']
            width = image_to_latent_c.shape[-2]
            height = image_to_latent_c.shape[-3]
            out_width = width // compression * encode_vae.downscale_ratio
            out_height = height // compression * encode_vae.downscale_ratio
            s = comfy.utils.common_upscale(image_to_latent_c.movedim(-1, 1), out_width, out_height, 'bicubic', 'center').movedim(1, -1)
            c_latent = encode_vae.encode(s[:, :, :, :3])
            b_latent = torch.zeros([c_latent.shape[0], 4, height // 4, width // 4])
            samples_c = {'samples': c_latent}
            samples_c = RepeatLatentBatch().repeat(samples_c, batch_size)[0]
            samples_b = {'samples': b_latent}
            samples_b = RepeatLatentBatch().repeat(samples_b, batch_size)[0]
            samples = (samples_c, samples_b)
            images = image_to_latent_c
        elif latent_c is not None:
            samples_c = latent_c
            samples = (samples_c, samples[1])
            images = pipe['images']
        if samples_c is not None:
            samples = (samples_c, samples[1])
        new_pipe = {'model': pipe['model'], 'positive': pipe['positive'], 'negative': pipe['negative'], 'vae': pipe['vae'], 'clip': pipe['clip'], 'samples': samples, 'images': images, 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'encode_vae_name': encode_vae_name, 'decode_vae_name': decode_vae_name, 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'denoise': denoise, 'add_noise': 'enabled'}}
        sampler.update_value_by_id('pipe_line', my_unique_id, new_pipe)
        del pipe
        return {'ui': {'value': [seed]}, 'result': (new_pipe,)}
```