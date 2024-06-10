# Documentation
- Class name: samplerFull
- Category: EasyUse/Sampler
- Output node: True
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

节点类'samplerFull'旨在提供一个全面的采样框架，用于生成高质量的图像。它利用先进的采样技术的力量，创造视觉连贯和多样化的输出。该节点的主要功能是促进生成与输入条件和约束相一致的图像，确保丰富的结果多样性。通过抽象采样过程，此节点强调生成既美观又技术准确的图像，为系统的创造性和研究导向目标做出重要贡献。

# Input types
## Required
- pipe
    - ‘pipe’参数是‘samplerFull’节点的主要输入，为采样过程提供必要的数据和设置。它包括模型信息、条件数据和配置参数，指导最终图像的生成。此参数至关重要，因为它直接影响输出图像的质量和特性。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- steps
    - ‘s steps’参数定义了采样过程将经历的迭代次数。它是决定生成图像的精炼级别的关键因素。通常，步数越多，生成的图像就越详细、越精炼，因为模型有更多机会调整和提高图像质量。
    - Comfy dtype: INT
    - Python dtype: int
- cfg
    - ‘cfg’参数调整采样过程的配置设置，影响诸如噪声水平和模型行为等多种方面。它在调整输出以满足特定要求或期望结果方面发挥着重要作用，允许对图像生成采取定制化的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- pipe
    - ‘samplerFull’节点的‘pipe’输出包含了在采样过程中更新和精炼的全面数据和设置。它包括最终图像、模型信息以及进一步处理或分析所必需的任何其他相关细节。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict
- image
    - ‘image’输出代表了采样过程生成的最终图像。这些图像是输入参数和设置的直接体现，展示了‘samplerFull’节点在创建视觉上吸引人和情境相关的输出方面的能力。
    - Comfy dtype: IMAGE
    - Python dtype: List[torch.Tensor]

# Usage tips
- Infra type: GPU

# Source code
```
class samplerFull(LayerDiffuse):

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {'required': {'pipe': ('PIPE_LINE',), 'steps': ('INT', {'default': 20, 'min': 1, 'max': 10000}), 'cfg': ('FLOAT', {'default': 8.0, 'min': 0.0, 'max': 100.0}), 'sampler_name': (comfy.samplers.KSampler.SAMPLERS,), 'scheduler': (comfy.samplers.KSampler.SCHEDULERS,), 'denoise': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'image_output': (['Hide', 'Preview', 'Save', 'Hide/Save', 'Sender', 'Sender/Save'],), 'link_id': ('INT', {'default': 0, 'min': 0, 'max': sys.maxsize, 'step': 1}), 'save_prefix': ('STRING', {'default': 'ComfyUI'})}, 'optional': {'seed': ('INT', {'default': 0, 'min': 0, 'max': MAX_SEED_NUM}), 'model': ('MODEL',), 'positive': ('CONDITIONING',), 'negative': ('CONDITIONING',), 'latent': ('LATENT',), 'vae': ('VAE',), 'clip': ('CLIP',), 'xyPlot': ('XYPLOT',), 'image': ('IMAGE',)}, 'hidden': {'tile_size': 'INT', 'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO', 'my_unique_id': 'UNIQUE_ID', 'embeddingsList': (folder_paths.get_filename_list('embeddings'),)}}
    RETURN_TYPES = ('PIPE_LINE', 'IMAGE', 'MODEL', 'CONDITIONING', 'CONDITIONING', 'LATENT', 'VAE', 'CLIP', 'INT')
    RETURN_NAMES = ('pipe', 'image', 'model', 'positive', 'negative', 'latent', 'vae', 'clip', 'seed')
    OUTPUT_NODE = True
    FUNCTION = 'run'
    CATEGORY = 'EasyUse/Sampler'

    def run(self, pipe, steps, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, seed=None, model=None, positive=None, negative=None, latent=None, vae=None, clip=None, xyPlot=None, tile_size=None, prompt=None, extra_pnginfo=None, my_unique_id=None, force_full_denoise=False, disable_noise=False, downscale_options=None):
        easyCache.update_loaded_objects(prompt)
        samp_model = model if model is not None else pipe['model']
        samp_positive = positive if positive is not None else pipe['positive']
        samp_negative = negative if negative is not None else pipe['negative']
        samp_samples = latent if latent is not None else pipe['samples']
        samp_vae = vae if vae is not None else pipe['vae']
        samp_clip = clip if clip is not None else pipe['clip']
        samp_seed = seed if seed is not None else pipe['seed']
        steps = steps if steps is not None else pipe['loader_settings']['steps']
        start_step = pipe['loader_settings']['start_step'] if 'start_step' in pipe['loader_settings'] else 0
        last_step = pipe['loader_settings']['last_step'] if 'last_step' in pipe['loader_settings'] else 10000
        cfg = cfg if cfg is not None else pipe['loader_settings']['cfg']
        sampler_name = sampler_name if sampler_name is not None else pipe['loader_settings']['sampler_name']
        scheduler = scheduler if scheduler is not None else pipe['loader_settings']['scheduler']
        denoise = denoise if denoise is not None else pipe['loader_settings']['denoise']
        add_noise = pipe['loader_settings']['add_noise'] if 'add_noise' in pipe['loader_settings'] else 'enabled'
        force_full_denoise = pipe['loader_settings']['force_full_denoise'] if 'force_full_denoise' in pipe['loader_settings'] else True
        disable_noise = False
        if add_noise == 'disable':
            disable_noise = True

        def downscale_model_unet(samp_model):
            if downscale_options is None:
                return samp_model
            elif 'PatchModelAddDownscale' in ALL_NODE_CLASS_MAPPINGS:
                cls = ALL_NODE_CLASS_MAPPINGS['PatchModelAddDownscale']
                if downscale_options['downscale_factor'] is None:
                    unet_config = samp_model.model.model_config.unet_config
                    if unet_config is not None and 'samples' in samp_samples:
                        height = samp_samples['samples'].shape[2] * 8
                        width = samp_samples['samples'].shape[3] * 8
                        context_dim = unet_config.get('context_dim')
                        longer_side = width if width > height else height
                        if context_dim is not None and longer_side > context_dim:
                            width_downscale_factor = float(width / context_dim)
                            height_downscale_factor = float(height / context_dim)
                            if width_downscale_factor > 1.75:
                                log_node_warn('正在收缩模型Unet...')
                                log_node_warn('收缩系数:' + str(width_downscale_factor))
                                (samp_model,) = cls().patch(samp_model, downscale_options['block_number'], width_downscale_factor, 0, 0.35, True, 'bicubic', 'bicubic')
                            elif height_downscale_factor > 1.25:
                                log_node_warn('正在收缩模型Unet...')
                                log_node_warn('收缩系数:' + str(height_downscale_factor))
                                (samp_model,) = cls().patch(samp_model, downscale_options['block_number'], height_downscale_factor, 0, 0.35, True, 'bicubic', 'bicubic')
                else:
                    cls = ALL_NODE_CLASS_MAPPINGS['PatchModelAddDownscale']
                    log_node_warn('正在收缩模型Unet...')
                    log_node_warn('收缩系数:' + str(downscale_options['downscale_factor']))
                    (samp_model,) = cls().patch(samp_model, downscale_options['block_number'], downscale_options['downscale_factor'], downscale_options['start_percent'], downscale_options['end_percent'], downscale_options['downscale_after_skip'], downscale_options['downscale_method'], downscale_options['upscale_method'])
            return samp_model

        def process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, steps, start_step, last_step, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent, force_full_denoise=force_full_denoise, disable_noise=disable_noise):
            if 'layer_diffusion_method' in pipe['loader_settings']:
                samp_blend_samples = pipe['blend_samples'] if 'blend_samples' in pipe else None
                additional_cond = pipe['loader_settings']['layer_diffusion_cond'] if 'layer_diffusion_cond' in pipe['loader_settings'] else (None, None, None)
                method = self.get_layer_diffusion_method(pipe['loader_settings']['layer_diffusion_method'], samp_blend_samples is not None)
                images = pipe['images'].movedim(-1, 1) if 'images' in pipe else None
                weight = pipe['loader_settings']['layer_diffusion_weight'] if 'layer_diffusion_weight' in pipe['loader_settings'] else 1.0
                (samp_model, samp_positive, samp_negative) = self.apply_layer_diffusion(samp_model, method, weight, samp_samples, samp_blend_samples, samp_positive, samp_negative, images, additional_cond)
            blend_samples = pipe['blend_samples'] if 'blend_samples' in pipe else None
            layer_diffusion_method = pipe['loader_settings']['layer_diffusion_method'] if 'layer_diffusion_method' in pipe['loader_settings'] else None
            empty_samples = pipe['loader_settings']['empty_samples'] if 'empty_samples' in pipe['loader_settings'] else None
            samples = empty_samples if layer_diffusion_method is not None and empty_samples is not None else samp_samples
            if samp_model is not None:
                samp_model = downscale_model_unet(samp_model)
            start_time = int(time.time() * 1000)
            samp_samples = sampler.common_ksampler(samp_model, samp_seed, steps, cfg, sampler_name, scheduler, samp_positive, samp_negative, samples, denoise=denoise, preview_latent=preview_latent, start_step=start_step, last_step=last_step, force_full_denoise=force_full_denoise, disable_noise=disable_noise)
            end_time = int(time.time() * 1000)
            latent = samp_samples['samples']
            if tile_size is not None:
                samp_images = samp_vae.decode_tiled(latent, tile_x=tile_size // 8, tile_y=tile_size // 8)
            else:
                samp_images = samp_vae.decode(latent).cpu()
            (new_images, samp_images, alpha) = self.layer_diffusion_decode(layer_diffusion_method, latent, blend_samples, samp_images, samp_model)
            end_decode_time = int(time.time() * 1000)
            spent_time = '扩散:' + str((end_time - start_time) / 1000) + '秒, 解码:' + str((end_decode_time - end_time) / 1000) + '秒'
            results = easySave(new_images, save_prefix, image_output, prompt, extra_pnginfo)
            sampler.update_value_by_id('results', my_unique_id, results)
            easyCache.update_loaded_objects(prompt)
            new_pipe = {'model': samp_model, 'positive': samp_positive, 'negative': samp_negative, 'vae': samp_vae, 'clip': samp_clip, 'samples': samp_samples, 'blend_samples': blend_samples, 'images': new_images, 'samp_images': samp_images, 'alpha': alpha, 'seed': samp_seed, 'loader_settings': {**pipe['loader_settings'], 'spent_time': spent_time}}
            sampler.update_value_by_id('pipe_line', my_unique_id, new_pipe)
            del pipe
            if image_output in ('Hide', 'Hide/Save'):
                return {'ui': {}, 'result': sampler.get_output(new_pipe)}
            if image_output in ('Sender', 'Sender/Save'):
                PromptServer.instance.send_sync('img-send', {'link_id': link_id, 'images': results})
            return {'ui': {'images': results}, 'result': sampler.get_output(new_pipe)}

        def process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, steps, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent, xyPlot, force_full_denoise, disable_noise):
            sampleXYplot = easyXYPlot(xyPlot, save_prefix, image_output, prompt, extra_pnginfo, my_unique_id, sampler, easyCache)
            if not sampleXYplot.validate_xy_plot():
                return process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, steps, 0, 10000, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent)
            if samp_model is not None:
                samp_model = downscale_model_unet(samp_model)
            alpha = None
            blend_samples = pipe['blend_samples'] if 'blend_samples' in pipe else None
            layer_diffusion_method = pipe['loader_settings']['layer_diffusion_method'] if 'layer_diffusion_method' in pipe['loader_settings'] else None
            plot_image_vars = {'x_node_type': sampleXYplot.x_node_type, 'y_node_type': sampleXYplot.y_node_type, 'lora_name': pipe['loader_settings']['lora_name'] if 'lora_name' in pipe['loader_settings'] else None, 'lora_model_strength': pipe['loader_settings']['lora_model_strength'] if 'model_strength' in pipe['loader_settings'] else None, 'lora_clip_strength': pipe['loader_settings']['lora_clip_strength'] if 'clip_strength' in pipe['loader_settings'] else None, 'lora_stack': pipe['loader_settings']['lora_stack'] if 'lora_stack' in pipe['loader_settings'] else None, 'steps': steps, 'cfg': cfg, 'sampler_name': sampler_name, 'scheduler': scheduler, 'denoise': denoise, 'seed': samp_seed, 'images': pipe['images'], 'model': samp_model, 'vae': samp_vae, 'clip': samp_clip, 'positive_cond': samp_positive, 'negative_cond': samp_negative, 'ckpt_name': pipe['loader_settings']['ckpt_name'] if 'ckpt_name' in pipe['loader_settings'] else None, 'vae_name': pipe['loader_settings']['vae_name'] if 'vae_name' in pipe['loader_settings'] else None, 'clip_skip': pipe['loader_settings']['clip_skip'] if 'clip_skip' in pipe['loader_settings'] else None, 'positive': pipe['loader_settings']['positive'] if 'positive' in pipe['loader_settings'] else None, 'positive_token_normalization': pipe['loader_settings']['positive_token_normalization'] if 'positive_token_normalization' in pipe['loader_settings'] else None, 'positive_weight_interpretation': pipe['loader_settings']['positive_weight_interpretation'] if 'positive_weight_interpretation' in pipe['loader_settings'] else None, 'negative': pipe['loader_settings']['negative'] if 'negative' in pipe['loader_settings'] else None, 'negative_token_normalization': pipe['loader_settings']['negative_token_normalization'] if 'negative_token_normalization' in pipe['loader_settings'] else None, 'negative_weight_interpretation': pipe['loader_settings']['negative_weight_interpretation'] if 'negative_weight_interpretation' in pipe['loader_settings'] else None}
            if 'models' in pipe['loader_settings']:
                plot_image_vars['models'] = pipe['loader_settings']['models']
            if 'vae_use' in pipe['loader_settings']:
                plot_image_vars['vae_use'] = pipe['loader_settings']['vae_use']
            if 'a1111_prompt_style' in pipe['loader_settings']:
                plot_image_vars['a1111_prompt_style'] = pipe['loader_settings']['a1111_prompt_style']
            if 'cnet_stack' in pipe['loader_settings']:
                plot_image_vars['cnet'] = pipe['loader_settings']['cnet_stack']
            if 'positive_cond_stack' in pipe['loader_settings']:
                plot_image_vars['positive_cond_stack'] = pipe['loader_settings']['positive_cond_stack']
            if 'negative_cond_stack' in pipe['loader_settings']:
                plot_image_vars['negative_cond_stack'] = pipe['loader_settings']['negative_cond_stack']
            if layer_diffusion_method:
                plot_image_vars['layer_diffusion_method'] = layer_diffusion_method
            if 'layer_diffusion_weight' in pipe['loader_settings']:
                plot_image_vars['layer_diffusion_weight'] = pipe['loader_settings']['layer_diffusion_weight']
            if 'layer_diffusion_cond' in pipe['loader_settings']:
                plot_image_vars['layer_diffusion_cond'] = pipe['loader_settings']['layer_diffusion_cond']
            if 'empty_samples' in pipe['loader_settings']:
                plot_image_vars['empty_samples'] = pipe['loader_settings']['empty_samples']
            latent_image = sampleXYplot.get_latent(pipe['samples'])
            latents_plot = sampleXYplot.get_labels_and_sample(plot_image_vars, latent_image, preview_latent, start_step, last_step, force_full_denoise, disable_noise)
            samp_samples = {'samples': latents_plot}
            (images, image_list) = sampleXYplot.plot_images_and_labels()
            output_images = torch.stack([tensor.squeeze() for tensor in image_list])
            (new_images, samp_images, alpha) = self.layer_diffusion_decode(layer_diffusion_method, latents_plot, blend_samples, output_images, samp_model)
            results = easySave(images, save_prefix, image_output, prompt, extra_pnginfo)
            sampler.update_value_by_id('results', my_unique_id, results)
            easyCache.update_loaded_objects(prompt)
            new_pipe = {'model': samp_model, 'positive': samp_positive, 'negative': samp_negative, 'vae': samp_vae, 'clip': samp_clip, 'samples': samp_samples, 'blend_samples': blend_samples, 'samp_images': samp_images, 'images': new_images, 'seed': samp_seed, 'alpha': alpha, 'loader_settings': pipe['loader_settings']}
            sampler.update_value_by_id('pipe_line', my_unique_id, new_pipe)
            del pipe
            if image_output in ('Hide', 'Hide/Save'):
                return sampler.get_output(new_pipe)
            return {'ui': {'images': results}, 'result': sampler.get_output(new_pipe)}
        preview_latent = True
        if image_output in ('Hide', 'Hide/Save'):
            preview_latent = False
        xyplot_id = next((x for x in prompt if 'XYPlot' in str(prompt[x]['class_type'])), None)
        if xyplot_id is None:
            xyPlot = None
        else:
            xyPlot = pipe['loader_settings']['xyplot'] if 'xyplot' in pipe['loader_settings'] else xyPlot
        if xyPlot is not None:
            return process_xyPlot(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, steps, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent, xyPlot, force_full_denoise, disable_noise)
        else:
            return process_sample_state(pipe, samp_model, samp_clip, samp_samples, samp_vae, samp_seed, samp_positive, samp_negative, steps, start_step, last_step, cfg, sampler_name, scheduler, denoise, image_output, link_id, save_prefix, tile_size, prompt, extra_pnginfo, my_unique_id, preview_latent, force_full_denoise, disable_noise)
```