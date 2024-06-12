---
tags:
- Prompt
- Text
- Wildcard
---

# ImpactWildcardEncode
## Documentation
- Class name: `ImpactWildcardEncode`
- Category: `ImpactPack/Prompt`
- Output node: `False`

The ImpactWildcardEncode node is designed to dynamically replace placeholders within a string with actual values based on a predefined set of rules and dictionaries. It leverages patterns and wildcards to identify placeholders and uses a combination of random selection and specific matching criteria to determine the replacement values, thereby enabling the generation of customized and varied outputs.
## Input types
### Required
- **`model`**
    - This parameter specifies the model to be used in the process, playing a crucial role in determining the output based on the model's capabilities and characteristics.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - The clip parameter is used to specify the clip to be used alongside the model, affecting the final output by providing additional context or constraints.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`wildcard_text`**
    - The input string containing placeholders that need to be dynamically replaced. Its role is crucial as it serves as the template for the output generation, dictating where and how replacements should occur.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`populated_text`**
    - The text resulting from the replacement of wildcards in the wildcard_text. It represents the final output of the node's processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`mode`**
    - Determines the mode of operation, either populating the text with dynamic content or keeping it fixed, thus affecting the processing strategy.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`Select to add LoRA`**
    - Allows the selection of LoRA to be added to the text, influencing the customization and specificity of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`Select to add Wildcard`**
    - Enables the selection of additional wildcards to be incorporated into the text, further customizing the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`seed`**
    - A numerical seed that influences the randomness of wildcard replacements, ensuring reproducibility or variation in outputs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`model`**
    - Comfy dtype: `MODEL`
    - The model parameter output, potentially modified or selected based on the input conditions.
    - Python dtype: `str`
- **`clip`**
    - Comfy dtype: `CLIP`
    - The clip parameter output, which may be adjusted or chosen as part of the processing.
    - Python dtype: `str`
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - Represents additional conditioning information derived from the processing, affecting the final output.
    - Python dtype: `str`
- **`populated_text`**
    - Comfy dtype: `STRING`
    - The text with placeholders replaced by actual values, reflecting the dynamic content generation based on the provided options.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - Reroute
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [ControlNetApplyAdvanced](../../Comfy/Nodes/ControlNetApplyAdvanced.md)



## Source code
```python
class ImpactWildcardEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "model": ("MODEL",),
                        "clip": ("CLIP",),
                        "wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                        "populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                        "mode": ("BOOLEAN", {"default": True, "label_on": "Populate", "label_off": "Fixed"}),
                        "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"), ),
                        "Select to add Wildcard": (["Select the Wildcard to add to the text"], ),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                }

    CATEGORY = "ImpactPack/Prompt"

    RETURN_TYPES = ("MODEL", "CLIP", "CONDITIONING", "STRING")
    RETURN_NAMES = ("model", "clip", "conditioning", "populated_text")
    FUNCTION = "doit"

    @staticmethod
    def process_with_loras(**kwargs):
        return impact.wildcards.process_with_loras(**kwargs)

    @staticmethod
    def get_wildcard_list():
        return impact.wildcards.get_wildcard_list()

    def doit(self, *args, **kwargs):
        populated = kwargs['populated_text']
        model, clip, conditioning = impact.wildcards.process_with_loras(populated, kwargs['model'], kwargs['clip'])
        return (model, clip, conditioning, populated)

```
