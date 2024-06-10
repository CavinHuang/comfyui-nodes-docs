---
tags:
- Checkpoint
- CheckpointLoader
- Loader
- ModelIO
- ModelLoader
---

# Stable Cascade Checkpoint Loader (Inspire)
## Documentation
- Class name: `StableCascade_CheckpointLoader __Inspire`
- Category: `InspirePack/Backend`
- Output node: `False`

This node is designed to efficiently manage and load model checkpoints in a cascading manner, optimizing the process by utilizing caching mechanisms to avoid redundant loads. It supports conditional loading based on cache availability and specific requirements, thereby enhancing performance and resource utilization in model deployment scenarios.
## Input types
### Required
- **`stage_b`**
    - Specifies the checkpoint for the 'b' stage model. This parameter is essential for identifying and loading the correct model, with an option to utilize caching for improved efficiency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`key_opt_b`**
    - An optional key for the 'b' stage checkpoint to uniquely identify it in the cache, allowing for precise cache management and retrieval.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`stage_c`**
    - Specifies the checkpoint for the 'c' stage model. Similar to 'stage_b', it is crucial for loading the appropriate model and can leverage caching for optimization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`key_opt_c`**
    - Serves as an optional key for the 'c' stage checkpoint, enabling specific cache operations and ensuring efficient model management.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`cache_mode`**
    - Determines the caching strategy (e.g., none, stage_b, stage_c, all), affecting how checkpoints are stored or retrieved from the cache to optimize loading times.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`b_model`**
    - Comfy dtype: `MODEL`
    - The model loaded from the 'b' stage checkpoint, ready for use.
    - Python dtype: `torch.nn.Module`
- **`b_vae`**
    - Comfy dtype: `VAE`
    - The VAE component associated with the 'b' stage model.
    - Python dtype: `torch.nn.Module`
- **`c_model`**
    - Comfy dtype: `MODEL`
    - The model loaded from the 'c' stage checkpoint, ready for use.
    - Python dtype: `torch.nn.Module`
- **`c_vae`**
    - Comfy dtype: `VAE`
    - The VAE component associated with the 'c' stage model.
    - Python dtype: `torch.nn.Module`
- **`c_clip_vision`**
    - Comfy dtype: `CLIP_VISION`
    - The CLIP vision component loaded alongside the 'c' stage model, facilitating multimodal operations.
    - Python dtype: `torch.nn.Module`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The CLIP model component, supporting various tasks including text and image understanding.
    - Python dtype: `torch.nn.Module`
- **`key_b`**
    - Comfy dtype: `STRING`
    - The cache key associated with the 'b' stage model, reflecting its cache status or identifier.
    - Python dtype: `str`
- **`key_c`**
    - Comfy dtype: `STRING`
    - The cache key associated with the 'c' stage model, reflecting its cache status or identifier.
    - Python dtype: `str`
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
