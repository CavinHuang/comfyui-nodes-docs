
# Documentation
- Class name: AV_LoraListLoader
- Category: Art Venture/Loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

AV_LoraListLoader节点旨在根据提供的数据和配置加载和堆叠LoRA模型列表。它通过按顺序应用多个LoRA调整来促进模型和剪辑的动态增强，从而通过LoRA参数实现复杂的模型行为修改。

# Input types
## Required
- model
    - 'model'参数代表将应用LoRA调整的初始模型。它对于定义LoRA堆叠过程的起点至关重要。
    - Comfy dtype: MODEL
    - Python dtype: str
- clip
    - 'clip'参数表示将与主模型一起通过LoRA调整进行修改的初始剪辑模型。它在堆叠过程中扮演关键角色，因为它会受到修改。
    - Comfy dtype: CLIP
    - Python dtype: str
- data
    - 'data'参数包含要加载和应用的LoRA模型列表，以JSON格式呈现。它对于指定哪些LoRA模型及其相应的强度将影响模型和剪辑至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- base_url
    - 'base_url'参数提供获取本地未找到的LoRA模型的基础URL。它有助于从外部源动态加载LoRA模型。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- model
    - 返回应用指定LoRA调整后的修改模型。
    - Comfy dtype: MODEL
    - Python dtype: str
- clip
    - 返回应用LoRA调整后的修改剪辑模型。
    - Comfy dtype: CLIP
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AVLoraListLoader(AVLoraListStacker):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model": ("MODEL",),
                "clip": ("CLIP",),
                "data": ("STRING", {"default": "", "multiline": True, "dynamicPrompts": False}),
            },
            "optional": {"base_url": ("STRING", {"default": lora_cloud_front_url})},
        }

    RETURN_TYPES = ("MODEL", "CLIP")

    def load_list_lora(self, model, clip, data, base_url=lora_cloud_front_url):
        lora_params = self.parse_lora_list(data, base_url=base_url)

        if len(lora_params) == 0:
            return (model, clip)

        def recursive_load_lora(lora_params, model, clip, id, folder_paths):
            if len(lora_params) == 0:
                return model, clip

            lora_name, strength_model, strength_clip = lora_params[0]

            lora_path = folder_paths.get_full_path("loras", lora_name)
            lora_model, lora_clip = comfy.sd.load_lora_for_models(
                model, clip, comfy.utils.load_torch_file(lora_path), strength_model, strength_clip
            )

            # Call the function again with the new lora_model and lora_clip and the remaining tuples
            return recursive_load_lora(lora_params[1:], lora_model, lora_clip, id, folder_paths)

        lora_model, lora_clip = recursive_load_lora(lora_params, model, clip, id, folder_paths)

        return (lora_model, lora_clip)

```
