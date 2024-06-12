# Documentation
- Class name: SaveLatent
- Category: _for_testing
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaveLatent节点旨在将样本的潜在表示保存到磁盘。它通过将潜在张量转换为可以轻松检索和用于进一步处理或分析的文件格式来处理存储过程。该节点确保潜在数据安全地写入，并有选择地包含元数据以提供额外的上下文。

# Input types
## Required
- samples
    - “samples”参数至关重要，因为它包含需要保存的潜在表示。它直接影响节点的操作，通过确定写入输出文件的数据。
    - Comfy dtype: LATENT
    - Python dtype: torch.Tensor
## Optional
- filename_prefix
    - “filename_prefix”参数定义了保存的潜在文件的文件名的起始部分。它影响输出目录中文件的组织和命名方式。
    - Comfy dtype: STRING
    - Python dtype: str
- prompt
    - 当提供“prompt”参数时，它会向保存的潜在文件的元数据中添加描述，这对于跟踪生成潜在表示的上下文非常有用。
    - Comfy dtype: PROMPT
    - Python dtype: str
- extra_pnginfo
    - “extra_pnginfo”参数允许在潜在文件的元数据中包含额外的信息。这对于存储可能对潜在数据的分析或使用相关的任何额外细节非常有用。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- ui
    - 输出中的“ui”参数是一个字典，包含有关保存的潜在文件的信息，包括文件名和子文件夹，这些信息可用于用户界面显示或进一步处理。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: CPU

# Source code
```
class SaveLatent:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'samples': ('LATENT',), 'filename_prefix': ('STRING', {'default': 'latents/ComfyUI'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save'
    OUTPUT_NODE = True
    CATEGORY = '_for_testing'

    def save(self, samples, filename_prefix='ComfyUI', prompt=None, extra_pnginfo=None):
        (full_output_folder, filename, counter, subfolder, filename_prefix) = folder_paths.get_save_image_path(filename_prefix, self.output_dir)
        prompt_info = ''
        if prompt is not None:
            prompt_info = json.dumps(prompt)
        metadata = None
        if not args.disable_metadata:
            metadata = {'prompt': prompt_info}
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata[x] = json.dumps(extra_pnginfo[x])
        file = f'{filename}_{counter:05}_.latent'
        results = list()
        results.append({'filename': file, 'subfolder': subfolder, 'type': 'output'})
        file = os.path.join(full_output_folder, file)
        output = {}
        output['latent_tensor'] = samples['samples']
        output['latent_format_version_0'] = torch.tensor([])
        comfy.utils.save_torch_file(output, file, metadata=metadata)
        return {'ui': {'latents': results}}
```