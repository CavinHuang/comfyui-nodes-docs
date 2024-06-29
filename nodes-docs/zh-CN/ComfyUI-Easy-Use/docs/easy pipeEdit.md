# Documentation
- Class name: pipeEdit
- Category: EasyUse/Pipe
- Output node: False
- Repo Ref: https://github.com/yolain/ComfyUI-Easy-Use.git

pipeEdit节点是一个全面的精炼和调整处理流程中元素的工具。它旨在简化条件的修改、模型的集成以及各种数据类型的处理，确保复杂作的工作流程无缝进行。

# Input types
## Required
- clip_skip
    - 此参数决定流水线中CLIP模型的跳过级别，对控制CLIP对整体处理的影响至关重要。
    - Comfy dtype: INT
    - Python dtype: int
- conditioning_mode
    - 调节模式定义了在流水线中应用和组合各种条件的策略，影响最终输出的连贯性和与预期方向的一致性。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- optional_positive
    - 正面调节文本对于引导生成过程朝着期望的结果至关重要。它塑造了模型输出的创作方向。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_token_normalization
    - 此参数集确定了正面调节文本中的标记是如何规范化的，这显著影响生成内容的精确性和相关性。
    - Comfy dtype: COMBO
    - Python dtype: str

# Output types
- pipe
    - 更新后的流水线对象封装了pipeEdit节点所做的所有修改和配置，作为后续处理步骤的支柱。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - 模型参数代表流水线中使用的神经网络模型，更新确保特定任务的最佳性能和定制输出。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module

# Usage tips
- Infra type: GPU

# Source code
```
class pipeEdit:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip_skip': ('INT', {'default': -1, 'min': -24, 'max': 0, 'step': 1}), 'optional_positive': ('STRING', {'default': '', 'multiline': True}), 'positive_token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'positive_weight_interpretation': (['comfy', 'A1111', 'comfy++', 'compel', 'fixed attention'],), 'optional_negative': ('STRING', {'default': '', 'multiline': True}), 'negative_token_normalization': (['none', 'mean', 'length', 'length+mean'],), 'negative_weight_interpretation': (['comfy', 'A1111', 'comfy++', 'compel', 'fixed attention'],), 'a1111_prompt_style': ('BOOLEAN', {'default': False}), 'conditioning_mode': (['replace', 'concat', 'combine', 'average', 'timestep'], {'default': 'replace'}), 'average_strength': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.01}), 'old_cond_start': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'old_cond_end': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'new_cond_start': ('FLOAT', {'default': 0.0, 'min': 0.0, 'max': 1.0, 'step': 0.001}), 'new_cond_end': ('FLOAT', {'default': 1.0, 'min': 0.0, 'max': 1.0, 'step': 0.001})}, 'optional': {'pipe': ('PIPE_LINE',), 'model': ('MODEL',), 'pos': ('CONDITIONING',), 'neg': ('CONDITIONING',), 'latent': ('LATENT',), 'vae': ('VAE',), 'clip': ('CLIP',), 'image': ('IMAGE',)}, 'hidden': {'my_unique_id': 'UNIQUE_ID', 'prompt': 'PROMPT'}}
    RETURN_TYPES = ('PIPE_LINE', 'MODEL', 'CONDITIONING', 'CONDITIONING', 'LATENT', 'VAE', 'CLIP', 'IMAGE')
    RETURN_NAMES = ('pipe', 'model', 'pos', 'neg', 'latent', 'vae', 'clip', 'image')
    FUNCTION = 'flush'
    CATEGORY = 'EasyUse/Pipe'

    def flush(self, clip_skip, optional_positive, positive_token_normalization, positive_weight_interpretation, optional_negative, negative_token_normalization, negative_weight_interpretation, a1111_prompt_style, conditioning_mode, average_strength, old_cond_start, old_cond_end, new_cond_start, new_cond_end, pipe=None, model=None, pos=None, neg=None, latent=None, vae=None, clip=None, image=None, my_unique_id=None, prompt=None):
        model = model if model is not None else pipe.get('model')
        if model is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'Model missing from pipeLine')
        vae = vae if vae is not None else pipe.get('vae')
        if vae is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'VAE missing from pipeLine')
        clip = clip if clip is not None else pipe.get('clip')
        if clip is None:
            log_node_warn(f'pipeIn[{my_unique_id}]', 'Clip missing from pipeLine')
        if image is None:
            image = pipe.get('images') if pipe is not None else None
            samples = latent if latent is not None else pipe.get('samples')
            if samples is None:
                log_node_warn(f'pipeIn[{my_unique_id}]', 'Latent missing from pipeLine')
        else:
            batch_size = pipe['loader_settings']['batch_size'] if 'batch_size' in pipe['loader_settings'] else 1
            samples = {'samples': vae.encode(image[:, :, :, :3])}
            samples = RepeatLatentBatch().repeat(samples, batch_size)[0]
        pipe_lora_stack = pipe.get('lora_stack') if pipe is not None and 'lora_stack' in pipe else []
        steps = pipe['loader_settings']['steps'] if 'steps' in pipe['loader_settings'] else 1
        if pos is None and optional_positive != '':
            (pos, positive_wildcard_prompt, model, clip) = prompt_to_cond('positive', model, clip, clip_skip, pipe_lora_stack, optional_positive, positive_token_normalization, positive_weight_interpretation, a1111_prompt_style, my_unique_id, prompt, easyCache, True, steps)
            pos = set_cond(pipe['positive'], pos, conditioning_mode, average_strength, old_cond_start, old_cond_end, new_cond_start, new_cond_end)
            pipe['loader_settings']['positive'] = positive_wildcard_prompt
            pipe['loader_settings']['positive_token_normalization'] = positive_token_normalization
            pipe['loader_settings']['positive_weight_interpretation'] = positive_weight_interpretation
            if a1111_prompt_style:
                pipe['loader_settings']['a1111_prompt_style'] = True
        else:
            pos = pipe.get('positive')
            if pos is None:
                log_node_warn(f'pipeIn[{my_unique_id}]', 'Pos Conditioning missing from pipeLine')
        if neg is None and optional_negative != '':
            (neg, negative_wildcard_prompt, model, clip) = prompt_to_cond('negative', model, clip, clip_skip, pipe_lora_stack, optional_negative, negative_token_normalization, negative_weight_interpretation, a1111_prompt_style, my_unique_id, prompt, easyCache, True, steps)
            neg = set_cond(pipe['negative'], neg, conditioning_mode, average_strength, old_cond_start, old_cond_end, new_cond_start, new_cond_end)
            pipe['loader_settings']['negative'] = negative_wildcard_prompt
            pipe['loader_settings']['negative_token_normalization'] = negative_token_normalization
            pipe['loader_settings']['negative_weight_interpretation'] = negative_weight_interpretation
            if a1111_prompt_style:
                pipe['loader_settings']['a1111_prompt_style'] = True
        else:
            neg = pipe.get('negative')
            if neg is None:
                log_node_warn(f'pipeIn[{my_unique_id}]', 'Neg Conditioning missing from pipeLine')
        if pipe is None:
            pipe = {'loader_settings': {'positive': '', 'negative': '', 'xyplot': None}}
        new_pipe = {**pipe, 'model': model, 'positive': pos, 'negative': neg, 'vae': vae, 'clip': clip, 'samples': samples, 'images': image, 'seed': pipe.get('seed') if pipe is not None and 'seed' in pipe else None, 'loader_settings': {**pipe['loader_settings']}}
        del pipe
        return (new_pipe, model, pos, neg, latent, vae, clip, image)
```