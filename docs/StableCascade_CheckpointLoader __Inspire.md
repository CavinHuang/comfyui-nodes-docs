
# Documentation
- Class name: StableCascade_CheckpointLoader __Inspire
- Category: InspirePack/Backend
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack

本节点旨在高效管理和加载模型检查点，采用级联方式优化流程，利用缓存机制避免重复加载。它支持基于缓存可用性和特定需求的条件加载，从而在模型部署场景中提高性能和资源利用率。

# Input types
## Required
- stage_b
    - 指定'b'阶段模型的检查点。该参数对于识别和加载正确的模型至关重要，并可选择利用缓存以提高效率。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- key_opt_b
    - 'b'阶段检查点的可选键，用于在缓存中唯一标识它，实现精确的缓存管理和检索。
    - Comfy dtype: STRING
    - Python dtype: str
- stage_c
    - 指定'c'阶段模型的检查点。与'stage_b'类似，它对于加载适当的模型至关重要，并可利用缓存进行优化。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- key_opt_c
    - 作为'c'阶段检查点的可选键，支持特定的缓存操作并确保高效的模型管理。
    - Comfy dtype: STRING
    - Python dtype: str
- cache_mode
    - 确定缓存策略（如none、stage_b、stage_c、all），影响检查点如何存储或从缓存中检索以优化加载时间。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- b_model
    - 从'b'阶段检查点加载的模型，可供使用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- b_vae
    - 与'b'阶段模型相关的VAE组件。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- c_model
    - 从'c'阶段检查点加载的模型，可供使用。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- c_vae
    - 与'c'阶段模型相关的VAE组件。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- c_clip_vision
    - 与'c'阶段模型一起加载的CLIP视觉组件，便于多模态操作。
    - Comfy dtype: CLIP_VISION
    - Python dtype: torch.nn.Module
- clip
    - CLIP模型组件，支持包括文本和图像理解在内的各种任务。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- key_b
    - 与'b'阶段模型关联的缓存键，反映其缓存状态或标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- key_c
    - 与'c'阶段模型关联的缓存键，反映其缓存状态或标识符。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class StableCascade_CheckpointLoader:
    @classmethod
    def INPUT_TYPES(s):
        ckpts = folder_paths.get_filename_list("checkpoints")
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

        return {"required": {
                        "stage_b": (ckpts, {'default': default_stage_b}),
                        "key_opt_b": ("STRING", {"multiline": False, "placeholder": "If empty, use 'stage_b' as the key."}),
                        "stage_c": (ckpts, {'default': default_stage_c}),
                        "key_opt_c": ("STRING", {"multiline": False, "placeholder": "If empty, use 'stage_c' as the key."}),
                        "cache_mode": (["none", "stage_b", "stage_c", "all"], {"default": "none"}),
                     }}

    RETURN_TYPES = ("MODEL", "VAE", "MODEL", "VAE", "CLIP_VISION", "CLIP", "STRING", "STRING")
    RETURN_NAMES = ("b_model", "b_vae", "c_model", "c_vae", "c_clip_vision", "clip", "key_b", "key_c")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Backend"

    def doit(self, stage_b, key_opt_b, stage_c, key_opt_c, cache_mode):
        if key_opt_b.strip() == '':
            key_b = stage_b
        else:
            key_b = key_opt_b.strip()

        if key_opt_c.strip() == '':
            key_c = stage_c
        else:
            key_c = key_opt_c.strip()

        if cache_mode in ['stage_b', "all"]:
            if key_b not in cache:
                res_b = nodes.CheckpointLoaderSimple().load_checkpoint(ckpt_name=stage_b)
                update_cache(key_b, "ckpt", (False, res_b))
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Ckpt '{stage_b}' is cached to '{key_b}'.")
            else:
                _, (_, res_b) = cache[key_b]
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Cached ckpt '{key_b}' is loaded. (Loading skip)")
            b_model, clip, b_vae = res_b
        else:
            b_model, clip, b_vae = nodes.CheckpointLoaderSimple().load_checkpoint(ckpt_name=stage_b)

        if cache_mode in ['stage_c', "all"]:
            if key_c not in cache:
                res_c = nodes.unCLIPCheckpointLoader().load_checkpoint(ckpt_name=stage_c)
                update_cache(key_c, "unclip_ckpt", (False, res_c))
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Ckpt '{stage_c}' is cached to '{key_c}'.")
            else:
                _, (_, res_c) = cache[key_c]
                print(f"[Inspire Pack] StableCascade_CheckpointLoader: Cached ckpt '{key_c}' is loaded. (Loading skip)")
            c_model, _, c_vae, clip_vision = res_c
        else:
            c_model, _, c_vae, clip_vision = nodes.unCLIPCheckpointLoader().load_checkpoint(ckpt_name=stage_c)

        return b_model, b_vae, c_model, c_vae, clip_vision, clip, key_b, key_c

```
