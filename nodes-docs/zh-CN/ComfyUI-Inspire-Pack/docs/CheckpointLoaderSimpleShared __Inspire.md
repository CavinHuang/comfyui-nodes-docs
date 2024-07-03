
# Documentation
- Class name: CheckpointLoaderSimpleShared __Inspire
- Category: InspirePack/Backend
- Output node: False

CheckpointLoaderSimpleShared节点旨在以共享方式管理模型检查点的加载和缓存。它通过在从磁盘加载检查点之前检查检查点是否已缓存，从而实现加载检查点的高效重用。该节点支持只读和覆盖模式，以适应不同的使用场景。

# Input types
## Required
- ckpt_name
    - 要加载的检查点的名称。此参数对于识别要检索和加载的检查点文件至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- key_opt
    - 可用于在缓存中唯一标识检查点的可选键。这允许更灵活的缓存策略，例如在不同的键下缓存相同的检查点。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- mode
    - 指定缓存模式，如"只读"或"覆盖缓存"，这决定了如何处理与缓存相关的检查点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- model
    - 从检查点加载的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 与检查点关联的CLIP模型（如果可用）。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- vae
    - 与检查点关联的VAE模型（如果可用）。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module
- cache key
    - 检查点在缓存中的键。这对后续操作的引用很有用。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CheckpointLoaderSimpleShared(nodes.CheckpointLoaderSimple):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                    "key_opt": ("STRING", {"multiline": False, "placeholder": "If empty, use 'ckpt_name' as the key."}),
                },
                "optional": {
                    "mode": (['Auto', 'Override Cache', 'Read Only'],),
                }}

    RETURN_TYPES = ("MODEL", "CLIP", "VAE", "STRING")
    RETURN_NAMES = ("model", "clip", "vae", "cache key")
    FUNCTION = "doit"

    CATEGORY = "InspirePack/Backend"

    def doit(self, ckpt_name, key_opt, mode='Auto'):
        if mode == 'Read Only':
            if key_opt.strip() == '':
                raise Exception("[CheckpointLoaderSimpleShared] key_opt cannot be omit if mode is 'Read Only'")
            key = key_opt.strip()
        elif key_opt.strip() == '':
            key = ckpt_name
        else:
            key = key_opt.strip()

        if key not in cache or mode == 'Override Cache':
            res = self.load_checkpoint(ckpt_name)
            update_cache(key, "ckpt", (False, res))
            cache_kind = 'ckpt'
            print(f"[Inspire Pack] CheckpointLoaderSimpleShared: Ckpt '{ckpt_name}' is cached to '{key}'.")
        else:
            cache_kind, (_, res) = cache[key]
            print(f"[Inspire Pack] CheckpointLoaderSimpleShared: Cached ckpt '{key}' is loaded. (Loading skip)")

        if cache_kind == 'ckpt':
            model, clip, vae = res
        elif cache_kind == 'unclip_ckpt':
            model, clip, vae, _ = res
        else:
            raise Exception(f"[CheckpointLoaderSimpleShared] Unexpected cache_kind '{cache_kind}'")

        return model, clip, vae, key

    @staticmethod
    def IS_CHANGED(ckpt_name, key_opt, mode='Auto'):
        if mode == 'Read Only':
            if key_opt.strip() == '':
                raise Exception("[CheckpointLoaderSimpleShared] key_opt cannot be omit if mode is 'Read Only'")
            key = key_opt.strip()
        elif key_opt.strip() == '':
            key = ckpt_name
        else:
            key = key_opt.strip()

        if mode == 'Read Only':
            return (None, cache_weak_hash(key))
        elif mode == 'Override Cache':
            return (ckpt_name, key)

        return (None, cache_weak_hash(key))

```
