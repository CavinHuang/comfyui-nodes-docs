# Documentation
- Class name: CheckpointLoaderSimpleShared
- Category: InspirePack/Backend
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点便于检索和缓存模型检查点，确保高效访问模型同时最小化不必要的加载操作。通过智能管理基于提供键和检查点名称的缓存，它简化了模型使用流程。

# Input types
## Required
- ckpt_name
    - 检查点名称对于识别要加载的特定模型至关重要。它在缓存系统中作为唯一参考，允许节点检索或存储相应的模型数据。
    - Comfy dtype: COMBO[folder_paths.get_filename_list('checkpoints'),]
    - Python dtype: Union[str, None]
## Optional
- key_opt
    - 这个可选参数允许用户指定一个自定义键来缓存检查点。如果不提供，则默认使用检查点名称，提供了缓存组织和访问方式的灵活性。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 模型输出代表已加载的机器学习或深度学习模型，准备进行进一步的处理或推理。它是节点功能的核心组成部分，使得下游任务成为可能。
    - Comfy dtype: ANY
    - Python dtype: Any
- clip
    - clip输出与特定模型组件相关联，通常用于辅助任务或额外处理。它补充了主模型输出，增强了节点的整体能力。
    - Comfy dtype: ANY
    - Python dtype: Any
- vae
    - VAE，即变分自编码器，是一种生成模型，可能由该节点加载。它在根据学习到的分布生成新的数据点或特征方面发挥着重要作用。
    - Comfy dtype: ANY
    - Python dtype: Any
- cache_key
    - 缓存键是用于在系统中引用缓存的检查点的唯一标识符。对于缓存机制内检查点的管理和检索至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class CheckpointLoaderSimpleShared(nodes.CheckpointLoaderSimple):

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'ckpt_name': (folder_paths.get_filename_list('checkpoints'),), 'key_opt': ('STRING', {'multiline': False, 'placeholder': "If empty, use 'ckpt_name' as the key."})}}
    RETURN_TYPES = ('MODEL', 'CLIP', 'VAE', 'STRING')
    RETURN_NAMES = ('model', 'clip', 'vae', 'cache key')
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Backend'

    def doit(self, ckpt_name, key_opt):
        if key_opt.strip() == '':
            key = ckpt_name
        else:
            key = key_opt.strip()
        if key not in cache:
            res = self.load_checkpoint(ckpt_name)
            cache[key] = ('ckpt', (False, res))
            print(f"[Inspire Pack] CheckpointLoaderSimpleShared: Ckpt '{ckpt_name}' is cached to '{key}'.")
        else:
            (_, (_, res)) = cache[key]
            print(f"[Inspire Pack] CheckpointLoaderSimpleShared: Cached ckpt '{key}' is loaded. (Loading skip)")
        (model, clip, vae) = res
        return (model, clip, vae, key)
```