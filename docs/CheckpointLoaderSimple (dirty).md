
# Documentation
- Class name: CheckpointLoaderSimple (dirty)
- Category: Bmad/api/dirty loaders
- Output node: False

CheckpointLoaderSimple (dirty) 节点旨在以一种不太常规或"dirty"的方式简化模型检查点的加载过程。它通过自动查找和使用基于给定名称的适当检查点文件来简化检查点加载过程，从而为各种应用程序提供更简单、更快速的模型初始化。

# Input types
## Required
- ckpt_name
    - 'ckpt_name' 参数指定要加载的检查点文件的名称。该节点自动化了查找匹配文件名的过程，使得在不需要指定确切文件路径的情况下更容易加载模型。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 'model' 输出代表从指定检查点加载的模型，可随时进行进一步使用或分析。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 'clip' 输出提供与加载的检查点相关的 CLIP 模型（如果可用且被请求）。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- vae
    - 'vae' 输出提供与加载的检查点相关联的 VAE 模型（如果可用且被请求）。
    - Comfy dtype: VAE
    - Python dtype: torch.nn.Module


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class DirtyCheckpointLoaderSimple:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {"ckpt_name": ("STRING", {"default": ""})}}

    RETURN_TYPES = ("MODEL", "CLIP", "VAE")
    FUNCTION = "load_checkpoint"

    CATEGORY = "Bmad/api/dirty loaders"

    def load_checkpoint(self, ckpt_name, output_vae=True, output_clip=True):
        ckpt_name = DirtyLoaderUtils.find_matching_filename(
            ckpt_name, folder_paths.get_filename_list("checkpoints"))

        loader = nodes.CheckpointLoaderSimple()
        return loader.load_checkpoint(ckpt_name, output_vae, output_clip)

```
