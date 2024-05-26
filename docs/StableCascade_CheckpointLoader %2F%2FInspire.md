# Documentation
- Class name: StableCascade_CheckpointLoader
- Category: InspirePack/Backend
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在高效地从指定目录加载和管理检查点，将它们分类到不同的阶段，并促进模型及相关数据的检索。它通过提供缓存功能来增强工作流程，这可以通过重用先前加载的检查点显著加快重复任务的速度。

# Input types
## Required
- stage_b
    - stage_b参数指定了级联第二阶段的检查点文件名称。它对于节点识别正确的检查点以进行加载和缓存至关重要，这直接影响后续的处理和结果。
    - Comfy dtype: STRING
    - Python dtype: str
- stage_c
    - stage_c参数表示级联第三阶段的检查点文件。它对于节点正确加载高级模型及相关数据至关重要，影响最终输出和模型利用的有效性。
    - Comfy dtype: STRING
    - Python dtype: str
- cache_mode
    - cache_mode参数控制节点的缓存行为。它决定了是从未缓存中加载检查点还是直接从文件系统加载，以及是否将加载的检查点缓存以供将来使用。这个参数显著影响节点的性能和效率。
    - Comfy dtype: COMBO
    - Python dtype: str
## Optional
- key_opt_b
    - key_opt_b参数作为检查点的可选标识符。它允许自定义命名，这对于引用缓存中的特定检查点非常有用。如果提供该值，它将被用作缓存中的键，否则将使用'stage_b'。
    - Comfy dtype: STRING
    - Python dtype: str
- key_opt_c
    - key_opt_c参数是stage_c检查点的备用键。它使用户能够用唯一的名称标记检查点，以便更好地管理缓存和引用。如果留空，则使用'stage_c'作为默认键。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- b_model
    - b_model输出代表从检查点加载的第二阶段模型。它是进一步处理和分析的关键组成部分，因为它包含了模型功能所需的学习参数和结构。
    - Comfy dtype: MODEL
    - Python dtype: Any
- b_vae
    - b_vae输出提供了与第二阶段相关的变分自编码器（VAE）。它在生成新数据点或重建现有数据点方面起着重要作用，对于涉及生成模型的任务至关重要。
    - Comfy dtype: VAE
    - Python dtype: Any
- c_model
    - c_model输出是从检查点检索的第三阶段模型。它在整个工作流程中起着关键作用，因为它通常比第二阶段模型更为精细，能够完成更高级的任务。
    - Comfy dtype: MODEL
    - Python dtype: Any
- c_vae
    - c_vae输出表示第三阶段的变分自编码器（VAE）。它对于需要高级数据生成和操作能力的任务至关重要，如特征提取和降维。
    - Comfy dtype: VAE
    - Python dtype: Any
- clip_vision
    - clip_vision输出是第三阶段模型的专门组件，专注于与视觉相关的任务。它对于涉及图像处理和理解的应用非常重要，为视觉数据分析提供了坚实的基础。
    - Comfy dtype: CLIP_VISION
    - Python dtype: Any
- clip
    - clip输出代表与第二阶段相关的上下文语言模型（CLM）。它对于需要自然语言理解和生成的任务至关重要，为基于文本的应用程序提供了强大的工具。
    - Comfy dtype: CLIP
    - Python dtype: Any
- key_b
    - key_b输出是用于缓存第二阶段检查点的标识符。它对于有效管理缓存非常重要，因为它允许在后续操作中快速检索和重用检查点。
    - Comfy dtype: STRING
    - Python dtype: str
- key_c
    - key_c输出对应于第三阶段检查点的缓存标识符。它在缓存管理过程中起着关键作用，确保高效访问高级模型及其组件。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class StableCascade_CheckpointLoader:

    @classmethod
    def INPUT_TYPES(s):
        ckpts = folder_paths.get_filename_list('checkpoints')
        default_stage_b = ''
        default_stage_c = ''
        sc_ckpts = [x for x in ckpts if 'cascade' in x.lower()]
        sc_b_ckpts = [x for x in sc_ckpts if 'stage_b' in x.lower()]
        sc_c_ckpts = [x for x in sc_ckpts if 'stage_c' in x.lower()]
        if len(sc_b_ckpts) == 0:
            sc_b_ckpts = [x for x in ckpts if 'stage_b' in x.lower()]
        if len(sc_c_ckpts) == 0:
            sc_c_ckpts = [x for x in ckpts if 'stage_c' in x.lower()]
        if len(sc_b_ckpts) == 0:
            sc_b_ckpts = ckpts
        if len(sc_c_ckpts) == 0:
            sc_c_ckpts = ckpts
        if len(sc_b_ckpts) > 0:
            default_stage_b = sc_b_ckpts[0]
        if len(sc_c_ckpts) > 0:
            default_stage_c = sc_c_ckpts[0]
        return {'required': {'stage_b': (ckpts, {'default': default_stage_b}), 'key_opt_b': ('STRING', {'multiline': False, 'placeholder': "If empty, use 'stage_b' as the key."}), 'stage_c': (ckpts, {'default': default_stage_c}), 'key_opt_c': ('STRING', {'multiline': False, 'placeholder': "If empty, use 'stage_c' as the key."}), 'cache_mode': (['none', 'stage_b', 'stage_c', 'all'], {'default': 'none'})}}
    RETURN_TYPES = ('MODEL', 'VAE', 'MODEL', 'VAE', 'CLIP_VISION', 'CLIP', 'STRING', 'STRING')
    RETURN_NAMES = ('b_model', 'b_vae', 'c_model', 'c_vae', 'c_clip_vision', 'clip', 'key_b', 'key_c')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'

    def doit(self, stage_b, key_opt_b, stage_c, key_opt_c, cache_mode):
        if key_opt_b.strip() == '':
            key_b = stage_b
        else:
            key_b = key_opt_b.strip()
        if key_opt_c.strip() == '':
            key_c = stage_c
        else:
            key_c = key_opt_c.strip()
        if cache_mode in ['stage_b', 'all']:
            if key_b not in cache:
                res_b = nodes.CheckpointLoaderSimple().load_checkpoint(ckpt_name=stage_b)
                cache[key_b] = ('ckpt', (False, res_b))
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Ckpt '{stage_b}' is cached to '{key_b}'.")
            else:
                (_, (_, res_b)) = cache[key_b]
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Cached ckpt '{key_b}' is loaded. (Loading skip)")
            (b_model, clip, b_vae) = res_b
        else:
            (b_model, clip, b_vae) = nodes.CheckpointLoaderSimple().load_checkpoint(ckpt_name=stage_b)
        if cache_mode in ['stage_c', 'all']:
            if key_c not in cache:
                res_c = nodes.CheckpointLoaderSimple().load_checkpoint(ckpt_name=stage_c)
                cache[key_c] = ('unclip_ckpt', (False, res_c))
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Ckpt '{stage_c}' is cached to '{key_c}'.")
            else:
                (_, (_, res_c)) = cache[key_c]
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Cached ckpt '{key_c}' is loaded. (Loading skip)")
            (c_model, _, c_vae, clip_vision) = res_c
        else:
            (c_model, _, c_vae, clip_vision) = nodes.unCLIPCheckpointLoader().load_checkpoint(ckpt_name=stage_c)
        return (b_model, b_vae, c_model, c_vae, clip_vision, clip, key_b, key_c)
```