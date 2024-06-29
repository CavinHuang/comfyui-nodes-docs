# Documentation
- Class name: samplerSDTurbo
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

samplerSDTurbo节点旨在通过先进的采样技术高效生成高质量图像。它通过将输入数据经过一系列转换来操作，既优化速度又优化视觉保真度。该节点特别适用于需要从复杂数据集中生成图像的应用，提供了性能和输出质量之间的平衡。

# Input types
## Required
- pipe
    - ‘pipe’参数是主要输入，为采样过程提供必要的数据和设置。它包括模型信息、正负例以及指导节点生成所需输出的其他相关配置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image_output
    - ‘image_output’参数决定如何处理生成的图像。选项包括隐藏、预览、保存或它们的组合，允许在结果展示或存储方式上具有灵活性。
    - Comfy dtype: COMBO
    - Python dtype: str
- link_id
    - ‘link_id’参数对于将生成的图像与相应的请求或进程链接至关重要。它确保正确的图像与正确的任务关联，简化了工作流程并减少了错误的可能性。
    - Comfy dtype: INT
    - Python dtype: int
- save_prefix
    - ‘save_prefix’参数设置保存图像文件的前缀，这对于组织和识别输出至关重要。这个前缀作为图像的唯一标识符，有助于它们的检索和管理。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- model
    - ‘model’参数允许指定在采样过程中使用的特定模型。它提供了一种根据特定要求或偏好调整节点操作的手段，增强了节点的多功能性和适应性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- tile_size
    - ‘tile_size’参数影响图像解码过程中的平铺策略，影响生成图像的分辨率和布局。这是一个可选设置，可以根据期望的输出特征进行调整。
    - Comfy dtype: INT
    - Python dtype: Optional[int]
- prompt
    - ‘prompt’参数提供了指导图像生成过程的文本描述。它是控制创意方向和确保输出与预期主题或概念一致的关键元素。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - ‘extra_pnginfo’参数包含与PNG图像相关的额外信息，可用于完善图像处理并提升最终结果。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]
- my_unique_id
    - ‘my_unique_id’参数是一个跟踪与图像生成相关的独特请求或进程的标识符。它在管理和关联输出与各自任务或工作流程方面起着重要作用。
    - Comfy dtype: UNIQUE_ID
    - Python dtype: Union[str, int]

# Output types
- pipe
    - ‘pipe’输出是一个包含采样过程结果的综合结构，包括生成的图像和相关元数据。它作为系统不同组件之间传递数据的通道，促进进一步的处理或分析。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- image
    - ‘image’输出包含生成的图像，这是采样过程的主要结果。这些图像已经准备好使用，代表了节点功能的顶点以及应用的采样技术的有效性。
    - Comfy dtype: IMAGE
    - Python dtype: List[PIL.Image.Image]

# Usage tips
- Infra type: GPU

# Source code
```
class samplerSDTurbo:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'], {'default': 'Preview'}), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'model': ('MODEL',)}, 'hidden': {'tile_size': 'INT', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE')
    RETURN_NAMES = ('pipe', 'image')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, image_output, link_id, save_prefix, model=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        easyCache.update_loaded_objects(prompt)
        my_unique_id = int(my_unique_id)
        samp_model = pipe['model'] if model is None else model
        samp_positive = pipe['positive']
        samp_negative = pipe['negative']
        samp_samples = pipe['samples']
        samp_vae = pipe['vae']
        samp_clip = pipe['clip']
        samp_seed = pipe['seed']
        samp_sampler = pipe['loader_settings']['sampler']
        sigmas = pipe['loader_settings']['sigmas']
        cfg = pipe['loader_settings']['cfg']
        steps = pipe['loader_settings']['steps']
        disable_noise = False
        preview_latent = True
        if image_output in ('Hide', 'Hide/Save'):
            preview_latent = False
        start_time = int(time.time() * 1000)
        samp_samples = sampler.custom_ksampler(samp_model, samp_seed, steps, cfg, samp_sampler, sigmas, samp_positive, samp_negative, samp_samples, disable_noise, preview_latent)
        end_time = int(time.time() * 1000)
        latent = samp_samples['samples']
        if tile_size is not None:
            samp_images = samp_vae.decode_tiled(latent, tile_x=tile_size // 8, tile_y=tile_size // 8)
        else:
            samp_images = samp_vae.decode(latent).cpu()
        end_decode_time = int(time.time() * 1000)
        spent_time = '扩散:' + str((end_time - start_time) / 1000) + '秒, 解码:' + str((end_decode_time - end_time) / 1000) + '秒'
        easyCache.update_loaded_objects(prompt)
        results = easySave(samp_images, save_prefix, image_output, prompt, extra_pnginfo)
        sampler.update_value_by_id('results', my_unique_id, results)
        new_pipe = {'model': samp_model, 'positive': samp_positive, 'negative': samp_negative, 'vae': samp_vae, 'clip': samp_clip, 'samples': samp_samples, 'images': samp_images, 'seed': samp_seed, 'loader_settings': {**pipe['loader_settings'], 'spent_time': spent_time}}
        sampler.update_value_by_id('pipe_line', my_unique_id, new_pipe)
        del pipe
        if image_output in ('Hide', 'Hide/Save'):
            return {'ui': {}, 'result': sampler.get_output(new_pipe)}
        if image_output in ('Sender', 'Sender/Save'):
            PromptServer.instance.send_sync('img-send', {'link_id': link_id, 'images': results})
        return {'ui': {'images': results}, 'result': sampler.get_output(new_pipe)}
```