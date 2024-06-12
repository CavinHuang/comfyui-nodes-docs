# Documentation
- Class name: samplerCascadeFull
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

samplerCascadeFull节点旨在执行生成模型框架中的抽样过程。它协调编码、抽样和解码阶段，以产生一系列图像或潜在表示。该节点对于基于提供的种子和模型生成新图像内容至关重要，为用户提供了利用高级抽样技术的无缝接口。

# Input types
## Required
- pipe
    - ‘pipe’参数是一个关键输入，它携带了抽样过程所需的管道设置和数据。它包括加载器设置、模型引用和其他指导节点操作的必要信息。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- encode_vae_name
    - ‘encode_vae_name’参数指定用于将输入图像编码到潜在空间的VAE模型的名称。它是一个可选参数，允许对编码过程进行定制。
    - Comfy dtype: STRING
    - Python dtype: Union[str, None]
- decode_vae_name
    - ‘decode_vae_name’参数确定用于将潜在表示解码回图像的VAE模型。它为用户提供了根据他们的需求选择解码模型的灵活性。
    - Comfy dtype: STRING
    - Python dtype: Union[str, None]
- steps
    - ‘steps’参数定义了抽样过程中要执行的抽样步骤数。它直接影响生成图像的质量和细节。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- pipe
    - ‘pipe’输出包含抽样过程后更新的管道设置和结果。它是一个全面的输出，封装了节点执行后的状态。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]
- model_b
    - ‘model_b’输出代表了抽样过程中解码阶段使用模型。对于需要引用其操作中使用的具体模型的用户来说，它是重要的。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- latent_b
    - ‘latent_b’输出提供了由抽样过程生成的潜在表示。这些潜在编码对于希望进一步操作或分析生成内容的用户至关重要。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor

# Usage tips
- Infra type: GPU

# Source code
```
class samplerCascadeFull:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'encode_vae_name': (['None'] + folder_paths.get_filename_list('vae'),), 'decode_vae_name': (['None'] + folder_paths.get_filename_list('vae'),), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 4.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS, {'default': 'euler_ancestral'}), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS, {'default': 'simple'}), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'],), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'}), 'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM})}, 'optional': {'image_to_latent_c': ('IMAGE',), 'latent_c': ('LATENT',), 'model_c': ('MODEL',)}, 'hidden': {'tile_size': 'INT', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'LATENT')
    RETURN_NAMES = ('pipe', 'model_b', 'latent_b')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, encode_vae_name, decode_vae_name, steps, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, seed, image_to_latent_c=None, latent_c=None, model_c=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False):
        encode_vae_name = encode_vae_name if encode_vae_name is not None else pipe['loader_settings']['encode_vae_name']
        decode_vae_name = decode_vae_name if decode_vae_name is not None else pipe['loader_settings']['decode_vae_name']
        batch_size = pipe['loader_settings']['batch_size'] if 'batch_size' in pipe['loader_settings'] else 1
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
            latent_c = encode_vae.encode(s[:, :, :, :3])
            latent_b = torch.zeros([latent_c.shape[0], 4, height // 4, width // 4])
            samples_c = {'samples': latent_c}
            samples_c = RepeatLatentBatch().repeat(samples_c, batch_size)[0]
            samples_b = {'samples': latent_b}
            samples_b = RepeatLatentBatch().repeat(samples_b, batch_size)[0]
            images = image_to_latent_c
        elif latent_c is not None:
            samples_c = latent_c
            samples_b = pipe['samples'][1]
            images = pipe['images']
        else:
            samples_c = pipe['samples'][0]
            samples_b = pipe['samples'][1]
            images = pipe['images']
        easyCache.update_loaded_objects(prompt)
        samp_model = model_c if model_c else pipe['model'][0]
        samp_positive = pipe['positive']
        samp_negative = pipe['negative']
        samp_samples = samples_c
        samp_seed = seed if seed is not None else pipe['seed']
        steps = steps if steps is not None else pipe['loader_settings']['steps']
        start_step = pipe['loader_settings']['start_step'] if 'start_step' in pipe['loader_settings'] else 0
        last_step = pipe['loader_settings']['last_step'] if 'last_step' in pipe['loader_settings'] else 10000
        cfg = cfg if cfg is not None else pipe['loader_settings']['cfg']
        sampler_name = sampler_name if sampler_name is not None else pipe['loader_settings']['sampler_name']
        scheduler = scheduler if scheduler is not None else pipe['loader_settings']['scheduler']
        denoise = denoise if denoise is not None else pipe['loader_settings']['denoise']
        start_time = int(time.time() * 1000)
        samp_samples = sampler.common_ksampler(samp_model, samp_seed, steps, cfg, sampler_name, scheduler, samp_positive, samp_negative, samp_samples, denoise=denoise, preview_latent=False, start_step=start_step, last_step=last_step, force_full_denoise=False, disable_noise=False)
        end_time = int(time.time() * 1000)
        stage_c = samp_samples['samples']
        results = None
        if image_output not in ['Hide', 'Hide/Save']:
            if decode_vae_name != 'None':
                decode_vae = easyCache.load_vae(decode_vae_name)
            else:
                decode_vae = pipe['vae'][0]
            samp_images = decode_vae.decode(stage_c).cpu()
            results = easySave(samp_images, save_prefix, image_output, prompt, extra_pnginfo)
            sampler.update_value_by_id('results', my_unique_id, results)
        end_decode_time = int(time.time() * 1000)
        spent_time = '扩散:' + str((end_time - start_time) / 1000) + '秒, 解码:' + str((end_decode_time - end_time) / 1000) + '秒'
        easyCache.update_loaded_objects(prompt)
        c1 = []
        for t in samp_positive:
            d = t[1].copy()
            if 'pooled_output' in d:
                d['pooled_output'] = torch.zeros_like(d['pooled_output'])
            n = [torch.zeros_like(t[0]), d]
            c1.append(n)
        c2 = []
        for t in c1:
            d = t[1].copy()
            d['stable_cascade_prior'] = stage_c
            n = [t[0], d]
            c2.append(n)
        new_pipe = {'model': pipe['model'][1], 'positive': c2, 'negative': c1, 'vae': pipe['vae'][1], 'clip': pipe['clip'], 'samples': samples_b, 'images': images, 'seed': seed, 'loader_settings': {**pipe['loader_settings'], 'spent_time': spent_time}}
        sampler.update_value_by_id('pipe_line', my_unique_id, new_pipe)
        del pipe
        if image_output in ('Hide', 'Hide/Save'):
            return {'ui': {}, 'result': sampler.get_output(new_pipe)}
        if image_output in ('Sender', 'Sender/Save') and results is not None:
            PromptServer.instance.send_sync('img-send', {'link_id': link_id, 'images': results})
        return {'ui': {'images': results}, 'result': (new_pipe, new_pipe['model'], new_pipe['samples'])}
```