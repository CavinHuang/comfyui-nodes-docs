---
tags:
- Model
- ModelList
---

# Get Models
## Documentation
- Class name: `Get Models`
- Category: `Bmad/dump`
- Output node: `True`

The 'Get Models' node is designed to facilitate the retrieval and organization of various model-related files within a specified directory. It supports a range of model types and configurations, allowing users to dump a comprehensive list or specific categories of models into a JSON file for easy access and management.
## Input types
### Required
- **`dump`**
    - Specifies the category of models to retrieve. It can be a specific model type like 'clip' or 'vae', or 'all models' to retrieve every available model. This selection dictates the scope of the dump operation, tailoring the output to the user's needs.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
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
