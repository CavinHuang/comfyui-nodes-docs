# Documentation
- Class name: CLIPSave
- Category: advanced/model_merging
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPSave节点旨在高效地将CLIP模型的状态保存到文件中，允许保留和将来重用模型的学习参数。它简化了模型序列化的过程，确保模型的状态可以以紧凑和标准化的格式被捕获和存储。

# Input types
## Required
- clip
    - ‘clip’参数对于节点的操作至关重要，因为它代表了要保存的CLIP模型。这是一个基本输入，使节点能够访问模型的状态以进行序列化。
    - Comfy dtype: CLIP
    - Python dtype: CLIP model instance
- filename_prefix
    - ‘filename_prefix’参数决定了保存文件名的开头部分，这对于识别和组织保存的模型文件至关重要。它在节点的功能中扮演重要角色，为输出文件提供了命名约定。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- prompt
    - 可选的‘prompt’参数可以用来在保存的模型中包含额外的上下文或描述。它通过允许将元数据与模型关联，增强了节点的功能，这对于后来的引用或注释目的非常有用。
    - Comfy dtype: PROMPT
    - Python dtype: Any
- extra_pnginfo
    - ‘extra_pnginfo’参数允许保存额外信息与模型一起。这对于存储补充模型主要功能的辅助数据特别有用，从而丰富了节点的能力。
    - Comfy dtype: EXTRA_PNGINFO
    - Python dtype: Dict[str, Any]

# Output types
- output
    - CLIPSave节点的输出是一个空字典，表示保存操作的完成。它表示模型的状态已成功序列化并存储，准备将来使用。
    - Comfy dtype: DICT
    - Python dtype: Dict[str, Any]

# Usage tips
- Infra type: GPU

# Source code
```
class CLIPSave:

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'clip': ('CLIP',), 'filename_prefix': ('STRING', {'default': 'clip/ComfyUI'})}, 'hidden': {'prompt': 'PROMPT', 'extra_pnginfo': 'EXTRA_PNGINFO'}}
    RETURN_TYPES = ()
    FUNCTION = 'save'
    OUTPUT_NODE = True
    CATEGORY = 'advanced/model_merging'

    def save(self, clip, filename_prefix, prompt=None, extra_pnginfo=None):
        prompt_info = ''
        if prompt is not None:
            prompt_info = json.dumps(prompt)
        metadata = {}
        if not args.disable_metadata:
            metadata['prompt'] = prompt_info
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    metadata[x] = json.dumps(extra_pnginfo[x])
        comfy.model_management.load_models_gpu([clip.load_model()])
        clip_sd = clip.get_sd()
        for prefix in ['clip_l.', 'clip_g.', '']:
            k = list(filter(lambda a: a.startswith(prefix), clip_sd.keys()))
            current_clip_sd = {}
            for x in k:
                current_clip_sd[x] = clip_sd.pop(x)
            if len(current_clip_sd) == 0:
                continue
            p = prefix[:-1]
            replace_prefix = {}
            filename_prefix_ = filename_prefix
            if len(p) > 0:
                filename_prefix_ = '{}_{}'.format(filename_prefix_, p)
                replace_prefix[prefix] = ''
            replace_prefix['transformer.'] = ''
            (full_output_folder, filename, counter, subfolder, filename_prefix_) = folder_paths.get_save_image_path(filename_prefix_, self.output_dir)
            output_checkpoint = f'{filename}_{counter:05}_.safetensors'
            output_checkpoint = os.path.join(full_output_folder, output_checkpoint)
            current_clip_sd = comfy.utils.state_dict_prefix_replace(current_clip_sd, replace_prefix)
            comfy.utils.save_torch_file(current_clip_sd, output_checkpoint, metadata=metadata)
        return {}
```