
# Documentation
- Class name: PromptExtractor __Inspire
- Category: InspirePack/Prompt
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

PromptExtractor节点属于Inspire包，旨在从图像中提取和处理提示信息，从而便于根据特定输入定制和操作提示。它充当了视觉内容和文本提示生成过程之间的桥梁，实现了动态提示的创建和修改。

# Input types
## Required
- image
    - 'image'输入类型用于提供视觉内容，从中提取或基于此生成提示。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive_id
    - 'positive_id'输入指定从可用选项中选择正面提示文本的标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_id
    - 'negative_id'输入指定从可用选项中选择负面提示文本的标识符。
    - Comfy dtype: STRING
    - Python dtype: str
- info
    - 'info'输入类型用于提供可能影响提示提取过程的额外信息或上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 这个输出类型代表提取出的正面提示文本。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 这个输出类型代表提取出的负面提示文本。
    - Comfy dtype: STRING
    - Python dtype: str


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
