---
tags:
- Prompt
---

# Prompt Extractor (Inspire)
## Documentation
- Class name: `PromptExtractor __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `True`

The PromptExtractor node in the Inspire pack is designed to extract and process prompt information from images, facilitating the customization and manipulation of prompts based on specific inputs. It serves as a bridge between the visual content and the textual prompt generation process, enabling dynamic prompt creation and modification.
## Input types
### Required
- **`image`**
    - The 'image' input type is used to provide the visual content from which prompts will be extracted or based upon.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive_id`**
    - The 'positive_id' input specifies the identifier for selecting the positive prompt text from the available options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_id`**
    - The 'negative_id' input specifies the identifier for selecting the negative prompt text from the available options.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`info`**
    - The 'info' input type is used for providing additional information or context that may influence the prompt extraction process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`positive`**
    - Comfy dtype: `STRING`
    - This output type represents the extracted positive prompt text.
    - Python dtype: `str`
- **`negative`**
    - Comfy dtype: `STRING`
    - This output type represents the extracted negative prompt text.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class PromptExtractor:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {"required": {
                    "image": (sorted(files), {"image_upload": True}),
                    "positive_id": ("STRING", {}),
                    "negative_id": ("STRING", {}),
                    "info": ("STRING", {"multiline": True})
                    },
                "hidden": {"unique_id": "UNIQUE_ID"},
                }

    CATEGORY = "InspirePack/Prompt"

    RETURN_TYPES = ("STRING", "STRING")
    RETURN_NAMES = ("positive", "negative")
    FUNCTION = "doit"

    OUTPUT_NODE = True

    def doit(self, image, positive_id, negative_id, info, unique_id):
        image_path = folder_paths.get_annotated_filepath(image)
        info = Image.open(image_path).info

        positive = ""
        negative = ""
        text = ""
        prompt_dicts = {}
        node_inputs = {}

        def get_node_inputs(x):
            if x in node_inputs:
                return node_inputs[x]
            else:
                node_inputs[x] = None

                obj = nodes.NODE_CLASS_MAPPINGS.get(x, None)
                if obj is not None:
                    input_types = obj.INPUT_TYPES()
                    node_inputs[x] = input_types
                    return input_types
                else:
                    return None

        if isinstance(info, dict) and 'workflow' in info:
            prompt = json.loads(info['prompt'])
            for k, v in prompt.items():
                input_types = get_node_inputs(v['class_type'])
                if input_types is not None:
                    inputs = input_types['required'].copy()
                    if 'optional' in input_types:
                        inputs.update(input_types['optional'])

                    for name, value in inputs.items():
                        if name in prompt_blacklist:
                            continue

                        if value[0] == 'STRING' and name in v['inputs']:
                            prompt_dicts[f"{k}.{name.strip()}"] = (v['class_type'], v['inputs'][name])

            for k, v in prompt_dicts.items():
                text += f"{k} [{v[0]}] ==> {v[1]}\n"

            positive = prompt_dicts.get(positive_id.strip(), "")
            negative = prompt_dicts.get(negative_id.strip(), "")
        else:
            text = "There is no prompt information within the image."

        PromptServer.instance.send_sync("inspire-node-feedback", {"node_id": unique_id, "widget_name": "info", "type": "text", "data": text})
        return (positive, negative)

```
