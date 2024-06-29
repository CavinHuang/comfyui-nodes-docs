---
tags:
- LoRA
---

# Lora Info
## Documentation
- Class name: `LoraInfo`
- Category: `jitcoder`
- Output node: `True`

The LoraInfo node is designed to retrieve and provide detailed information about a specific LoRa (Low-Power, Long-Range) configuration, including its output characteristics, trigger words, example prompts, and the base model it is associated with. This node serves as a bridge to access pre-stored or dynamically generated LoRa metadata, facilitating the integration and utilization of LoRa configurations within applications.
## Input types
### Required
- **`lora_name`**
    - The name of the LoRa configuration for which information is being requested. It is crucial for identifying the specific LoRa setup and retrieving its associated data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`trigger_words`**
    - Comfy dtype: `STRING`
    - The trigger words associated with the specified LoRa configuration, providing insights into its usage.
    - Python dtype: `str`
- **`example_prompt`**
    - Comfy dtype: `STRING`
    - An example prompt associated with the specified LoRa configuration, offering a glimpse into how it can be utilized.
    - Python dtype: `str`
- **`ui`**
    - A structured representation of the LoRa information, including textual output, model details, and optionally, example images and prompts.
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
