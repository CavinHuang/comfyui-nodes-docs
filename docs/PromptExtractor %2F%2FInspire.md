# Documentation
- Class name: PromptExtractor
- Category: InspirePack/Prompt
- Output node: True
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

PromptExtractor节点旨在分析图像文件并提取相关的提示信息，这些信息可用于生成创意提示或指导工作流程。它处理图像元数据以识别所需的输入和输出，并构建提示结构的文本表示。

# Input types
## Required
- image
    - 图像参数至关重要，因为它是节点执行分析的主要输入。预期图像文件位于输入目录中，并具有有效的格式。
    - Comfy dtype: COMBO[sorted_files]
    - Python dtype: str
- positive_id
    - positive_id参数对于识别提示的积极方面至关重要。它有助于从提取的提示数据中过滤出相关信息，对最终输出做出贡献。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_id
    - negative_id参数用于指定提示的负面方面。它在排除最终输出中的某些信息方面发挥作用，确保提取数据的相关性和准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- info
    - info参数包含有关图像的元数据，对于节点理解提示的上下文和结构至关重要。它对于准确提取和表示提示信息至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- unique_id
    - unique_id参数是节点操作的标识符，有助于在工作流程中跟踪和管理节点的执行。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- positive
    - 正面输出代表与positive_id参数一致的提取信息，通过提供提示的建设性方面，为创意过程做出贡献。
    - Comfy dtype: STRING
    - Python dtype: str
- negative
    - 负面输出捕获与negative_id参数一致的提取信息，通过排除提示中不需要的方面，有助于完善创意过程。
    - Comfy dtype: STRING
    - Python dtype: str

# Usage tips
- Infra type: CPU

# Source code
```
class PromptExtractor:

    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = [f for f in os.listdir(input_dir) if os.path.isfile(os.path.join(input_dir, f))]
        return {'required': {'image': (sorted(files), {'image_upload': True}), 'positive_id': ('STRING', {}), 'negative_id': ('STRING', {}), 'info': ('STRING', {'multiline': True})}, 'hidden': {'unique_id': 'UNIQUE_ID'}}
    CATEGORY = 'InspirePack/Prompt'
    RETURN_TYPES = ('STRING', 'STRING')
    RETURN_NAMES = ('positive', 'negative')
    FUNCTION = 'doit'
    OUTPUT_NODE = True

    def doit(self, image, positive_id, negative_id, info, unique_id):
        image_path = folder_paths.get_annotated_filepath(image)
        info = Image.open(image_path).info
        positive = ''
        negative = ''
        text = ''
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
            for (k, v) in prompt.items():
                input_types = get_node_inputs(v['class_type'])
                if input_types is not None:
                    inputs = input_types['required'].copy()
                    if 'optional' in input_types:
                        inputs.update(input_types['optional'])
                    for (name, value) in inputs.items():
                        if name in prompt_blacklist:
                            continue
                        if value[0] == 'STRING' and name in v['inputs']:
                            prompt_dicts[f'{k}.{name.strip()}'] = (v['class_type'], v['inputs'][name])
            for (k, v) in prompt_dicts.items():
                text += f'{k} [{v[0]}] ==> {v[1]}\n'
            positive = prompt_dicts.get(positive_id.strip(), '')
            negative = prompt_dicts.get(negative_id.strip(), '')
        else:
            text = 'There is no prompt information within the image.'
        PromptServer.instance.send_sync('inspire-node-feedback', {'node_id': unique_id, 'widget_name': 'info', 'type': 'text', 'data': text})
        return (positive, negative)
```