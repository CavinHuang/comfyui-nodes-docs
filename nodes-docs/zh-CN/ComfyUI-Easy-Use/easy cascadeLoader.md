# Documentation
- Class name: cascadeLoader
- Category: EasyUse/Loaders
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

cascadeLoader节点类旨在简化流水线中各种模型和数据的加载和处理。它封装了模型检索、通过LORA增强以及对正负输入应用CLIP嵌入的复杂性。该节点旨在提供这些组件的无缝集成，确保高效的数据流和最佳性能。

# Input types
## Required
- stage_c
    - stage_c参数对于指定流水线中使用的checkpoint或UNet模型至关重要。它决定了模型加载的起点，并对后续处理步骤有直接影响。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('unet') + folder_paths.get_filename_list('checkpoints'),]
    - Python dtype: Union[str, None]
- resolution
    - 分辨率输入对于定义潜在空间和输出图像的尺寸至关重要。它影响生成内容的质量和分辨率，从而影响流水线的整体结果。
    - Comfy dtype: COMBO[BASE_RESOLUTIONS]
    - Python dtype: Union[str, Tuple[int, int]]

# Output types
- pipe
    - pipe输出封装了为下游任务准备的加工模型、嵌入和其他相关数据。这是一个关键的输出，它使得流水线中的进一步操作和精细化成为可能。
    - Comfy dtype: PIPE_LINE
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class cascadeLoader:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        resolution_strings = [f'{width} x {height}' for (width, height) in BASE_RESOLUTIONS]
        return {'required': {'stage_c': (folder_paths.get_filename_list('unet') + folder_paths.get_filename_list('checkpoints'),), 'stage_b': (folder_paths.get_filename_list('unet') + folder_paths.get_filename_list('checkpoints'),), 'stage_a': (['Baked VAE'] + folder_paths.get_filename_list('vae'),), 'clip_name': (['None'] + folder_paths.get_filename_list('clip'),), 'lora_name': (['None'] + folder_paths.get_filename_list('loras'),), 'lora_model_strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'lora_clip_strength': ('FLOAT', {'default': 1.0, 'min': -10.0, 'max': 10.0, 'step': 0.01}), 'resolution': (resolution_strings, {'default': '1024 x 1024'}), 'empty_latent_width': ('INT', {'default': 1024, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'empty_latent_height': ('INT', {'default': 1024, 'min': 16, 'max': MAX_RESOLUTION, 'step': 8}), 'compression': ('INT', {'default': 42, 'min': 32, 'max': 64, 'step': 1}), 'positive': ('STRING', {'default': 'Positive', 'multiline': True}), 'negative': ('STRING', {'default': '', 'multiline': True}), 'batch_size': ('INT', {'default': 1, 'min': 1, 'max': 64})}, 'optional': {'optional_lora_stack': ('LORA_STACK',)}, 'hidden': {'prompt': 'PROMPT', 'my_unique_id': 'UNIQUE_ID'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'LATENT', 'VAE')
    RETURN_NAMES = ('pipe', 'model_c', 'latent_c', 'vae')
    FUNCTION = 'adv_pipeloader'
    CATEGORY = 'EasyUse/Loaders'

    def is_ckpt(self, name):
        is_ckpt = False
        path = folder_paths.get_full_path('checkpoints', name)
        if path is not None:
            is_ckpt = True
        return is_ckpt

    def adv_pipeloader(self, stage_c, stage_b, stage_a, clip_name, lora_name, lora_model_strength, lora_clip_strength, resolution, empty_latent_width, empty_latent_height, compression, positive, negative, batch_size, optional_lora_stack=None, prompt=None, my_unique_id=None):
        vae: VAE | None = None
        model_c: ModelPatcher | None = None
        model_b: ModelPatcher | None = None
        clip: CLIP | None = None
        can_load_lora = True
        pipe_lora_stack = []
        if resolution != '自定义 x 自定义':
            try:
                (width, height) = map(int, resolution.split(' x '))
                empty_latent_width = width
                empty_latent_height = height
            except ValueError:
                raise ValueError('Invalid base_resolution format.')
        latent_c = torch.zeros([batch_size, 16, empty_latent_height // compression, empty_latent_width // compression])
        latent_b = torch.zeros([batch_size, 4, empty_latent_height // 4, empty_latent_width // 4])
        samples = ({'samples': latent_c}, {'samples': latent_b})
        easyCache.update_loaded_objects(prompt)
        if self.is_ckpt(stage_c):
            (model_c, clip, vae_c, clip_vision) = easyCache.load_checkpoint(stage_c)
        else:
            model_c = easyCache.load_unet(stage_c)
            vae_c = None
        if self.is_ckpt(stage_b):
            (model_b, clip, vae_b, clip_vision) = easyCache.load_checkpoint(stage_b)
        else:
            model_b = easyCache.load_unet(stage_b)
            vae_b = None
        if optional_lora_stack is not None and can_load_lora:
            for lora in optional_lora_stack:
                lora = {'lora_name': lora[0], 'model': model_c, 'clip': clip, 'model_strength': lora[1], 'clip_strength': lora[2]}
                (model_c, clip) = easyCache.load_lora(lora)
                lora['model'] = model_c
                lora['clip'] = clip
                pipe_lora_stack.append(lora)
        if lora_name != 'None' and can_load_lora:
            lora = {'lora_name': lora_name, 'model': model_c, 'clip': clip, 'model_strength': lora_model_strength, 'clip_strength': lora_clip_strength}
            (model_c, clip) = easyCache.load_lora(lora)
            pipe_lora_stack.append(lora)
        model = (model_c, model_b)
        if clip_name != 'None':
            clip = easyCache.load_clip(clip_name, 'stable_cascade')
        if stage_a not in ['Baked VAE', 'Baked-VAE']:
            vae_b = easyCache.load_vae(stage_a)
        vae = (vae_c, vae_b)
        is_positive_linked_styles_selector = is_linked_styles_selector(prompt, my_unique_id, 'positive')
        is_negative_linked_styles_selector = is_linked_styles_selector(prompt, my_unique_id, 'negative')
        log_node_warn('正在处理提示词...')
        positive_seed = find_wildcards_seed(my_unique_id, positive, prompt)
        (model_c, clip, positive, positive_decode, show_positive_prompt, pipe_lora_stack) = process_with_loras(positive, model_c, clip, 'positive', positive_seed, can_load_lora, pipe_lora_stack, easyCache)
        positive_wildcard_prompt = positive_decode if show_positive_prompt or is_positive_linked_styles_selector else ''
        negative_seed = find_wildcards_seed(my_unique_id, negative, prompt)
        (model_c, clip, negative, negative_decode, show_negative_prompt, pipe_lora_stack) = process_with_loras(negative, model_c, clip, 'negative', negative_seed, can_load_lora, pipe_lora_stack, easyCache)
        negative_wildcard_prompt = negative_decode if show_negative_prompt or is_negative_linked_styles_selector else ''
        tokens = clip.tokenize(positive)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        positive_embeddings_final = [[cond, {'pooled_output': pooled}]]
        tokens = clip.tokenize(negative)
        (cond, pooled) = clip.encode_from_tokens(tokens, return_pooled=True)
        negative_embeddings_final = [[cond, {'pooled_output': pooled}]]
        image = easySampler.pil2tensor(Image.new('RGB', (1, 1), (0, 0, 0)))
        log_node_warn('处理结束...')
        pipe = {'model': model, 'positive': positive_embeddings_final, 'negative': negative_embeddings_final, 'vae': vae, 'clip': clip, 'samples': samples, 'images': image, 'seed': 0, 'loader_settings': {'vae_name': stage_a, 'lora_stack': pipe_lora_stack, 'refiner_ckpt_name': None, 'refiner_vae_name': None, 'refiner_lora_name': None, 'refiner_lora_model_strength': None, 'refiner_lora_clip_strength': None, 'positive': positive, 'positive_l': None, 'positive_g': None, 'positive_token_normalization': 'none', 'positive_weight_interpretation': 'comfy', 'positive_balance': None, 'negative': negative, 'negative_l': None, 'negative_g': None, 'negative_token_normalization': 'none', 'negative_weight_interpretation': 'comfy', 'negative_balance': None, 'empty_latent_width': empty_latent_width, 'empty_latent_height': empty_latent_height, 'batch_size': batch_size, 'seed': 0, 'empty_samples': samples, 'compression': compression}}
        return {'ui': {'positive': positive_wildcard_prompt, 'negative': negative_wildcard_prompt}, 'result': (pipe, model_c, model_b, vae)}
```