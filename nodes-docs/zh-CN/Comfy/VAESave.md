# Documentation
- Class name: VAESave
- Category: advanced/model_merging
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

VAESave节点负责保存变分自编码器（VAE）模型的状态。它提供了将模型的状态字典序列化到文件的功能，该文件可以用于以后的检索或部署。此节点对于保存训练模型的参数并确保可以在不丢失信息的情况下重新加载它们至关重要。

# Input types
## Required
- vae
    - 'vae'参数是必需的，因为它代表了要保存的变分自编码器模型。它是节点运行所必需的，也是决定节点操作的主要输入。
    - Comfy dtype: VAE
    - Python dtype: comfy.model_base.VAE
- filename_prefix
    - 'filename_prefix'参数用于定义保存VAE模型的输出文件名的前缀。它在组织和识别保存的模型文件中起着重要作用。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prompt
    - 'prompt'参数虽然是可选的，但可以用来包含有关模型预期用途的附加上下文或描述，这对于将来的参考或元数据目的可能很有用。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - 'extra_pnginfo'参数允许包含可以与模型一起存储的额外信息。这对于添加注释或其他可能需要的相关数据可能很有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: dict

# Output types
- output_checkpoint
    - 'output_checkpoint'参数表示保存的模型文件的路径。它标志着保存过程的成功完成，并提供了可以找到模型的位置。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class VAESave:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'vae': ('VAE',), 'filename_prefix': ('STRING', {'default': 'vae/ComfyUI_vae'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save'
    OUTPUT_NODE = True
    CATEGORY = 'advanced/model_merging'

    def save(self, vae, filename_prefix, prompt=None, extra_pnginfo=None):
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        prompt_info = ''
        if prompt is not None:
            prompt_info = json.dumps(prompt)
        metadata = {}
        if not args.disable_metadata:
            metadata['prompt'] = prompt_info
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata[x] = json.dumps(extra_pnginfo[x])
        output_checkpoint = f'{filename}_{counter:05}_.safetensors'
        output_checkpoint = os.path.join(full_output_folder, output_checkpoint)
        comfy.utils.save_torch_file(vae.get_sd(), output_checkpoint, metadata=metadata)
        return {}
```