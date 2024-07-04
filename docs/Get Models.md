
# Documentation
- Class name: Get Models
- Category: Bmad/dump
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Get Models 节点旨在从指定目录中检索和组织各种模型相关文件。它支持多种模型类型和配置，使用户能够将全面的模型列表或特定类别的模型导出为 JSON 文件，以便于访问和管理。

# Input types
## Required
- dump
    - 指定要检索的模型类别。可以是特定的模型类型，如"clip"或"vae"，也可以是"all models"以检索所有可用模型。这个选择决定了导出操作的范围，根据用户需求定制输出内容。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
该节点没有输出类型。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class GetModels:
    dump_option = ['all models',
                   'checkpoints',
                   'clip',
                   'clip_vision',
                   'configs',
                   'controlnet',
                   'diffusers',
                   'embeddings',
                   'gligen',
                   'hypernetworks',
                   'loras',
                   'style_models',
                   'upscale_models',
                   'vae'
                   ]

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "dump": (s.dump_option, {"default": "all models"})
        }
        }

    RETURN_TYPES = ()
    FUNCTION = "dump_it"
    CATEGORY = "Bmad/dump"
    OUTPUT_NODE = True

    def dump_it(self, dump):
        dump_data = {}

        if dump == 'all models':
            for item in self.dump_option[1:]:
                dump_data[item] = folder_paths.get_filename_list(item)
        else:
            dump_data['list'] = folder_paths.get_filename_list(dump)

        file = f"{dump}.json"
        file = os.path.join(self.output_dir, file)
        with open(file, 'w') as f:
            json.dump(dump_data, f, indent=1)

        return ()

```
