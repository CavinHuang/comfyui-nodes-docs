
# Documentation
- Class name: LoraInfo
- Category: jitcoder
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

LoraInfo节点旨在检索和提供特定LoRa (Low-Power, Long-Range) 配置的详细信息，包括其输出特征、触发词、示例提示词以及与之关联的基础模型。该节点充当了访问预存储或动态生成的LoRa元数据的桥梁，便于在应用程序中集成和使用LoRa配置。

# Input types
## Required
- lora_name
    - 请求信息的LoRa配置的名称。它对于识别特定的LoRa设置并检索其相关数据至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- trigger_words
    - 与指定LoRa配置相关的触发词，提供了关于其使用方法的洞察。
    - Comfy dtype: STRING
    - Python dtype: str
- example_prompt
    - 与指定LoRa配置相关的示例提示词，展示了如何使用该配置。
    - Comfy dtype: STRING
    - Python dtype: str
- ui
    - LoRa信息的结构化表示，包括文本输出、模型详情，以及可选的示例图像和提示词。
    - Comfy dtype: *未指定*
    - Python dtype: *未指定*


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoraInfo:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        LORA_LIST = sorted(folder_paths.get_filename_list("loras"), key=str.lower)
        return {
            "required": {
                "lora_name": (LORA_LIST, )
            },
        }

    RETURN_NAMES = ("trigger_words", "example_prompt")
    RETURN_TYPES = ("STRING", "STRING")
    FUNCTION = "lora_info"
    OUTPUT_NODE = True
    CATEGORY = "jitcoder"

    def lora_info(self, lora_name):
        (output, triggerWords, examplePrompt, baseModel) = get_lora_info(lora_name)
        return {"ui": {"text": (output,), "model": (baseModel,)}, "result": (triggerWords, examplePrompt)}

```
